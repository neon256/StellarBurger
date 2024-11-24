import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/app-header/app-header";
import AppMain from "./components/app-main/app-main";
import PropTypes from "prop-types";
import { error } from "console";
function App() {
  
  const [dataIng, setDataIng] = useState();
  const URL = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    function getData() {
      const res = fetch(URL)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((data) => setDataIng(data.data))
        .catch((error) => console.log(error));
      return res;
    }

    getData();
  }, []);

  if (dataIng === undefined) {
    return null;
  }
  return (
    <>
      <AppHeader />
      <AppMain data={dataIng} />
    </>
  );
}

export default App;
