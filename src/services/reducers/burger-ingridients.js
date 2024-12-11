import {
  ACTIVE_TAB,
  CHANGE_TAB,
  GET_INGRIDIENTS_FAILED,
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_SUCCESS,
} from "../actions/burger-ingridients";

const initialState = {
  data: [],
  load: true,
  dataRequest: false,
  dataFailed: false,
};

const initialActiveTab = {
  tab: "one",
};

export const listAllGetIngridients = (state = initialState, action) => {
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

export const activeTab = (state = initialActiveTab, action) => {
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
