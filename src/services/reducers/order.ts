import { TOrder } from "../actions/order";
import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  POST_INGRIDIENTS_FAILED,
  POST_INGRIDIENTS_REQUEST,
  POST_INGRIDIENTS_SUCCESS,
} from "../constants/order";

type TInitialOrder = {
  load: boolean,
  dataRequest: boolean,
  dataFailed: boolean,
  order: number | null,
};

const initialOrder: TInitialOrder = {
  load: false,
  dataRequest: false,
  dataFailed: false,
  order: null,
};

const getOrderState = {
  order:[],
  load: false,
  dataRequest: false,
  dataFailed: false,
}

export const order = (state = initialOrder, action: TOrder): TInitialOrder => {
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

export const getOrder = (state = getOrderState, action:TOrder)=>{
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        order: [],
        load: true,
        dataRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        load: false,
        dataRequest: false,
        dataFailed: false,
        order: action.value,
      };
    }
    case GET_ORDER_FAILED: {
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
}