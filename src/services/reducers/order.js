import {
  POST_INGRIDIENTS_FAILED,
  POST_INGRIDIENTS_REQUEST,
  POST_INGRIDIENTS_SUCCESS,
} from "../actions/order";

const initialorder = {
  load: false,
  dataRequest: false,
  dataFailed: false,
  order: null,
};

export const order = (state = initialorder, action) => {
  switch (action.type) {
    case POST_INGRIDIENTS_REQUEST: {
      return {
        ...state,
        order: null,
        load: true,
        dataRequest: true,
      };
    }
    case POST_INGRIDIENTS_SUCCESS: {
      return {
        load: false,
        dataRequest: false,
        dataFailed: false,
        order: action.value,
      };
    }
    case POST_INGRIDIENTS_FAILED: {
      return {
        ...state,
        load: false,
        dataRequest: false,
        dataFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
