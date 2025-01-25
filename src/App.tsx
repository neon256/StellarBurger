import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/app-header/app-header";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRouter  from "./components/app-router";
import { getData } from "./services/actions/burger-ingridients";

function App() {
  const [load, setLoad] = useState<boolean>(true);
  const dispatch: any = useDispatch();
  const ingridients = useSelector((state: any) => state.ingridient.data);
  
  useEffect(() => {
    dispatch(getData(setLoad));
  }, []);
  if (load) {
    return null;
  }
  console.log(ingridients);
  return (
    <BrowserRouter>
      <AppHeader />
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
