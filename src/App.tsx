import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/app-header/app-header";
import PropTypes, { any } from "prop-types";
import { error } from "console";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./services/actions/burger-ingridients";
import { BASE_URL } from "./utils/Api";
import { checkResponse } from "./utils/chekResponse";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRouter  from "./components/app-router";

function App() {
  const [load, setLoad] = useState(true);
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
