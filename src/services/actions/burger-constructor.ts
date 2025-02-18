import { BUN_SAVE, CHANGE_INGREDIENTS_POSITION, INGREDIENTS_REMOVE, INGREDIENTS_SAVE, SET_INGREDIENTS_PRICE } from "../constants/burger-constructor";
import { IIngredients } from "../type/data";

export interface IIngredientsSaveAction {
    readonly type: typeof INGREDIENTS_SAVE,
    value: IIngredients
}
export interface IIngredientsRemoveAction {
    readonly type: typeof INGREDIENTS_REMOVE,
    id: string
}
export interface IBunSaveAction {
    readonly type: typeof BUN_SAVE,
    value: IIngredients
}
export interface ISetIngredientsPriceAction {
    readonly type: typeof SET_INGREDIENTS_PRICE,
    dragBun: IIngredients,
    dragIng: Array<IIngredients>
}
export interface IChangeIngredientsPositionAction {
    readonly type: typeof CHANGE_INGREDIENTS_POSITION,
    change: Array<IIngredients>
    
}

export type TBurgerConstructorActions = 
    | IIngredientsSaveAction
    | IIngredientsRemoveAction
    | IBunSaveAction
    | ISetIngredientsPriceAction
    | IChangeIngredientsPositionAction