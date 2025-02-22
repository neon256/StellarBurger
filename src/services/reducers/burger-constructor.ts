import { act } from "react";
import { BUN_SAVE, CHANGE_INGREDIENTS_POSITION, INGREDIENTS_REMOVE, INGREDIENTS_SAVE, SET_INGREDIENTS_PRICE } from "../constants/burger-constructor";
import { IIngredients } from "../type/data";
import { TBurgerConstructorActions } from "../actions/burger-constructor";

type TInitialContructor = {
  bun: IIngredients | null,
  ingredients: Array<IIngredients>,
  isDraggingBun: boolean | IIngredients,
  isDraggingIng: boolean| Array<IIngredients>,
}

export const initialConstuctor: TInitialContructor = {
  bun: null,
  ingredients: [],

  isDraggingBun: false,
  isDraggingIng: false,
};

export const burgerConstructor = (state = initialConstuctor, action: TBurgerConstructorActions): TInitialContructor => {
  switch (action.type) {
    case INGREDIENTS_SAVE: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.value],
      };
    }
    case BUN_SAVE: {
      return {
        ...state,
        bun: action.value,
      };
    }
    case SET_INGREDIENTS_PRICE: {
      return {
        ...state,
        isDraggingBun: action.dragBun,
        isDraggingIng: action.dragIng,
      };
    }
    case CHANGE_INGREDIENTS_POSITION: {
      return {
        ...state,
        ingredients: action.change,
      };
    }
    case INGREDIENTS_REMOVE: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(ing => ing.uuid !== action.id)
      };
    }
    default: {
      return state;
    }
  }
};
