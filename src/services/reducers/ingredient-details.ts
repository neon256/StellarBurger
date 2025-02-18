import { TIngredientsDetails } from "../actions/ingedient-details";
import {
  DELETE_INGRIDIENTS_DETAIL,
  INGRIDIENTS_DETAIL,
} from "../constants/ingredient-details";
import { IIngredients } from "../type/data";

type TInitialDetails = {
  data: IIngredients | null,
};

const initialDetails: TInitialDetails = {
  data: null,
};

export const viewedIngridients = (state = initialDetails, action: TIngredientsDetails): TInitialDetails => {
  switch (action.type) {
    case INGRIDIENTS_DETAIL: {
      return {
        data: action.value,
      };
    }
    case DELETE_INGRIDIENTS_DETAIL: {
      return {
        data: null,
      };
    }
    default: {
      return state;
    }
  }
};
