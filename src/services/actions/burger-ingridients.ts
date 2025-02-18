import { BASE_URL } from "../../utils/Api";
import { checkResponse } from "../../utils/chekResponse";
import {
  ACTIVE_TAB,
  CHANGE_TAB,
  GET_BURGER_INGRIDIENTS,
  GET_INGRIDIENTS_FAILED,
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_SUCCESS,
} from "../constants/burger-ingridients";
import { AppDispatch, IIngredients } from "../type/data";

export interface IGetBurgerIngredientsAction {
  readonly type: typeof GET_BURGER_INGRIDIENTS;
}
export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGRIDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGRIDIENTS_SUCCESS;
  value: Array<IIngredients>;
}
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGRIDIENTS_FAILED;
}
export interface IActiveTabAction {
  readonly type: typeof ACTIVE_TAB;
  readonly value: "one"|"two"|"three"
}
export interface IChangeTabAction {
  readonly type: typeof CHANGE_TAB;
  readonly value: "one"|"two"|"three"
}

export type TBurgerIngredients =
  | IActiveTabAction
  | IChangeTabAction
  | IGetBurgerIngredientsAction
  | IGetIngredientsFailedAction
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction;

const URL: string = `${BASE_URL}/ingredients`;

export function getData(setLoad: any) {
  return function (dispatch: AppDispatch) {
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
