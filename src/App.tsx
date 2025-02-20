import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/app-header/app-header";

import { BrowserRouter, useLocation } from "react-router-dom";
import AppRouter  from "./components/app-router";
import { getData } from "./services/actions/burger-ingridients";
import { useAppDispatch, useAppSelector } from "./utils/hook";

function App() {
  const [load, setLoad] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const ingridients = useAppSelector((state: any) => state.ingridient.data);
  
  useEffect(() => {
    dispatch(getData(setLoad));
  }, []);
  if (load) {
    return null;
  }
  return (
    <BrowserRouter>
      <AppHeader />
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
