import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  privateRoutes,
  publicRoutes,
  resetRoutes,
} from "../services/router/routers";
import Error from "./Error";
import Modal from "./modal/modal";
import IngredientDetails from "./modal/ingredient-details/ingredient-details";
import { useDispatch } from "react-redux";
import { getUser, postResetToken } from "../services/actions/user";
import { createElement, useEffect, useState } from "react";
import FeedById from "../page/feed-by-id/feed-by-id";
import { AppDispatch } from "../services/type/data";
import { useAppDispatch } from "../utils/hook";

const AppRouter = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch= useAppDispatch();
  const [load, setLoad] = useState(false)

  useEffect(() => {
    dispatch(getUser(setLoad))
    if(load) {
      dispatch(postResetToken());
    }
  }, []);
  return (
    <>
      <Routes location={background || location}>
        {localStorage.getItem("accessToken") &&
          privateRoutes.map((rout) => (
            <Route
              path={rout.path}
              element={createElement(rout.component)}
              key={rout.path}
            />
          ))}
        {localStorage.getItem("resetPassword") ? (
          resetRoutes.map((rout) => (
            <Route
              path={rout.path}
              element={createElement(rout.component)}
              key={rout.path}
            />
          ))
        ) : (
          <Route path="*" element={<Error />} />
        )}
        {!localStorage.getItem("accessToken") &&
          publicRoutes.map((rout) => (
            <Route
              path={rout.path}
              element={createElement(rout.component)}
              key={rout.path}
            />
          ))}
        <Route path="*" element={<Error />} />
        
      </Routes>
      
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal header="Детали ингредиента" onClose={() => undefined}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal header="" onClose={() => undefined}>
                <FeedById/>
              </Modal>
            }
          />
        </Routes>
      )}
      {background && localStorage.getItem("accessToken") && (
        <Routes>
          <Route
            path="/profile/orders/:id"
            element={
              <Modal header="" onClose={() => undefined}>
                <FeedById/>
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;

