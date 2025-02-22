import { TWS } from "../actions/ws";
import {
  ORDERS_WEBSOCKET_CONNECT,
  ORDERS_WEBSOCKET_DISCONNECT,
  ORDERS_WEBSOCKET_MESSAGE_RECEIVED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE_RECEIVED,
} from "../constants/ws";

export const initialState = {
  feed: [],
  isConnecting: false,
  orders: [],
};
export const ws = (state = initialState, action: TWS) => {
  switch (action.type) {
    case WEBSOCKET_CONNECT: {
      return {
        ...state,
        isConnecting: true,
      };
    }
    case WEBSOCKET_MESSAGE_RECEIVED: {
      return {
        ...state,
        feed: JSON.parse(action.payload),
      };
    }
    case WEBSOCKET_DISCONNECT: {
      return {
        ...state,
        isConnecting: false,
      };
    }
    case ORDERS_WEBSOCKET_CONNECT: {
      return {
        ...state,
        isConnecting: true,
      };
    }
    case ORDERS_WEBSOCKET_MESSAGE_RECEIVED: {
      return {
        ...state,
        orders: JSON.parse(action.payload),
      };
    }
    case ORDERS_WEBSOCKET_DISCONNECT: {
      return {
        ...state,
        isConnecting: false,
      };
    }
    default: {
      return state;
    }
  }
};
