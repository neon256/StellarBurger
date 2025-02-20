import { Navigate, useLocation } from "react-router-dom";
import { ReactElement, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode; 
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactElement => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("accessToken");
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>; 
};

export default ProtectedRoute;