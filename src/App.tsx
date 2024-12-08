
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/app-header/app-header";
import AppMain from "./components/app-main/app-main";
import PropTypes from "prop-types";
import { error } from "console";
import { useDispatch, useSelector } from "react-redux";
import { GET_INGRIDIENTS_FAILED, GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_SUCCESS} from "./services/actions/burger-ingridients";
function App() {
  const [load, setLoad] = useState(true);
  const URL = "https://norma.nomoreparties.space/api/ingredients";
  const dispatch = useDispatch();
  const ingridients = useSelector((state:any) => state.ingridient.data);

  useEffect(() => {
    function getData() {
      dispatch({type: GET_INGRIDIENTS_REQUEST});
      const res = fetch(URL)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((data) => {
          setLoad(false); 
          
          dispatch({type: GET_INGRIDIENTS_SUCCESS, value: data.data});
        })
        .catch((error) => {
          console.log(error)
          dispatch({type: GET_INGRIDIENTS_FAILED})
        });
      return res;
    }

    getData();
  }, []);
  if (load) {
    return null;
  }
  console.log(ingridients);
  return (
    <>
      <AppHeader/>
      <AppMain/>
    </>
  );
}

export default App;
