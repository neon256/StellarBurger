import { BASE_URL } from "../../utils/Api";
import { checkResponse } from "../../utils/chekResponse";

export const GET_BURGER_INGRIDIENTS = "GET_BURGER_INGRIDIENTS";
export const GET_INGRIDIENTS_REQUEST = "GET_INGRIDIENTS_REQUEST";
export const GET_INGRIDIENTS_SUCCESS = "GET_INGRIDIENTS_SUCCESS";
export const GET_INGRIDIENTS_FAILED = "GET_INGRIDIENTS_FAILED";

export const ACTIVE_TAB = "ACTIVE_TAB";
export const CHANGE_TAB = "CHANGE_TAB";

const URL = `${BASE_URL}/ingredients`;

export function getData(setLoad) {
    return function(dispatch){
        dispatch({ type: GET_INGRIDIENTS_REQUEST });
        const res = fetch(URL)
          .then(checkResponse)
          .then((data) => {
            setLoad(false);
            dispatch({ type: GET_INGRIDIENTS_SUCCESS, value: data.data });
          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: GET_INGRIDIENTS_FAILED });
          });
        return res;
    }
    
  }