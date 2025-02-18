import { useDispatch } from "react-redux";
import { checkResponse } from "../../utils/chekResponse";
import { BASE_URL } from "../../utils/Api";
import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  POST_INGRIDIENTS_FAILED,
  POST_INGRIDIENTS_REQUEST,
  POST_INGRIDIENTS_SUCCESS,
} from "../constants/order";
import { access } from "fs";
import { AppDispatch } from "../type/data";

export interface IPostIngredientsRequestAction {
  readonly type: typeof POST_INGRIDIENTS_REQUEST;
}
export interface IPostIngredientsSuccesAction {
  readonly type: typeof POST_INGRIDIENTS_SUCCESS;
  readonly value: number;
}
export interface IPostIngredientsFailedAction {
  readonly type: typeof POST_INGRIDIENTS_FAILED;
}
export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSucces {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly value: any;
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TOrder =
  | IPostIngredientsFailedAction
  | IPostIngredientsRequestAction
  | IPostIngredientsSuccesAction
  | IGetOrderFailed
  | IGetOrderRequest
  | IGetOrderSucces;

const URL: string = `${BASE_URL}/orders`;

export function order(orderItems: string[], handleOpenModal: any) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: POST_INGRIDIENTS_REQUEST });
    const res = fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("accessToken")}`,
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
    handleOpenModal();
    return res;
  };
}

export function getOrder(id: string) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    console.log(id)
    const res = fetch(`${URL}/${id}`, {
      method: "GET",
    })
      .then(checkResponse)
      .then((data) => {
        
        dispatch({ type: GET_ORDER_SUCCESS, value: data.orders });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_ORDER_FAILED });
      });
    return res;
  };
}
