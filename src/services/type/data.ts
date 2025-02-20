import { Action, ActionCreator } from "redux";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TBurgerIngredients } from "../actions/burger-ingridients";
import { TIngredientsDetails } from "../actions/ingedient-details";
import { TOrder } from "../actions/order";
import { TResetPassword } from "../actions/reset-password";
import { TUser } from "../actions/user";
import { store } from "../reducers";
import { ThunkAction } from "redux-thunk";


export interface IIngredients {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
}
export interface IOrderIngredients {
  _id:string;
  ingredients: Array<string>
  status:string,
  name:string,
  createdAt:string,
  updatedAt:string,
  number:number,
}
export interface IOrder {
  success:boolean,
  orders: Array<IOrderIngredients>,
  total:number,
  totalToday:number,
  isConnecting?:boolean,
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
type TApplicationActions =
  | TBurgerConstructorActions
  | TIngredientsDetails
  | TBurgerIngredients
  | TOrder
  | TResetPassword
  | TUser;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;




