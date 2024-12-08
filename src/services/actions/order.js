import { useDispatch } from "react-redux";
import { checkResponse } from "../../utils/chekResponse";
import { BASE_URL } from "../../utils/Api";

export const POST_INGRIDIENTS_REQUEST = "POST_INGRIDIENTS_REQUEST";
export const POST_INGRIDIENTS_SUCCESS = "POST_INGRIDIENTS_SUCCESS";
export const POST_INGRIDIENTS_FAILED = "POST_INGRIDIENTS_FAILED";

const URL = `${BASE_URL}/orders`

export function order(orderItems, handleOpenModal) {
    return function (dispatch) {
      dispatch({ type: POST_INGRIDIENTS_REQUEST });
      const res = fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: orderItems }),
      })
        .then(checkResponse)
        .then((data) => {
          dispatch({ type: POST_INGRIDIENTS_SUCCESS, value: data.order.number });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: POST_INGRIDIENTS_FAILED });
        });
        handleOpenModal()
      return res;
    };
  
    
  }

