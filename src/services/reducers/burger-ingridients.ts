import { TBurgerIngredients } from "../actions/burger-ingridients";
import { ACTIVE_TAB, CHANGE_TAB, GET_INGRIDIENTS_FAILED, GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_SUCCESS } from "../constants/burger-ingridients";
import { IIngredients } from "../type/data";

type TInitialState = {
  data: Array<IIngredients>,
  load: boolean,
  dataRequest: boolean,
  dataFailed: boolean,
}

type TInitialActiveTab = {
  tab: "one"|"two"|"three",
};

export const initialState: TInitialState = {
  data: [],
  load: true,
  dataRequest: false,
  dataFailed: false,
};

export const initialActiveTab: TInitialActiveTab = {
  tab: "one",
};

export const listAllGetIngridients = (state = initialState, action: TBurgerIngredients): TInitialState => {
  switch (action.type) {
    case GET_INGRIDIENTS_REQUEST: {
      return {
        ...state,
        dataRequest: true,
      };
    }
    case GET_INGRIDIENTS_SUCCESS: {
      return {
        data: action.value,
        load: false,
        dataRequest: false,
        dataFailed: false,
      };
    }
    case GET_INGRIDIENTS_FAILED: {
      return {
        ...state,
        load: false,
        dataFailed: true,
        dataRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const activeTab = (state = initialActiveTab, action: TBurgerIngredients): TInitialActiveTab => {
  switch (action.type) {
    case ACTIVE_TAB: {
      return {
        tab: action.value,
      };
    }
    case CHANGE_TAB: {
      return {
        tab: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
