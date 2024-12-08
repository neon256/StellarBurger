import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/app-header/app-header";
import AppMain from "./components/app-main/app-main";
import PropTypes, { any } from "prop-types";
import { error } from "console";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_INGRIDIENTS_FAILED,
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_SUCCESS,
  getData,
} from "./services/actions/burger-ingridients";
import { BASE_URL} from "./utils/Api";
import { checkResponse } from "./utils/chekResponse";

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
    <>
      <AppHeader />
      <AppMain />
    </>
  );
}

export default App;
