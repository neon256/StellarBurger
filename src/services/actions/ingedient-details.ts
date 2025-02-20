// export const INGRIDIENTS_DETAIL: "INGRIDIENTS_DETAIL" = "INGRIDIENTS_DETAIL";
// export const DELETE_INGRIDIENTS_DETAIL: "DELETE_INGRIDIENTS_DETAIL" = "DELETE_INGRIDIENTS_DETAIL";

import { DELETE_INGRIDIENTS_DETAIL, INGRIDIENTS_DETAIL } from "../constants/ingredient-details";
import { IIngredients } from "../type/data";

export interface IIngredientsDetailAction {
    readonly type: typeof INGRIDIENTS_DETAIL;
    readonly value: IIngredients;
}
export interface IDeleteIngredientsDetailAction {
    readonly type: typeof DELETE_INGRIDIENTS_DETAIL;
}

export type TIngredientsDetails = 
    | IDeleteIngredientsDetailAction
    | IIngredientsDetailAction