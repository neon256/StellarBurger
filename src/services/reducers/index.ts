import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { activeTab, listAllGetIngridients } from "./burger-ingridients";
import { devToolsEnhancer } from "@redux-devtools/extension";
import { thunk, ThunkMiddleware } from "redux-thunk";
import { viewedIngridients } from "./ingredient-details";
import { burgerConstructor } from "./burger-constructor";
import { getOrder, order } from "./order";
import { user } from "./user";
import { ws } from "./ws";
import { resetPassword } from "./reset-password";
import { AppThunk, RootState } from "../type/data";
import { configureStore } from "@reduxjs/toolkit";
import createWebSocketMiddleware from "../middleware/socket-middleware";
import { ORDERS_WEBSOCKET_CONNECT, ORDERS_WEBSOCKET_CONNECTED, ORDERS_WEBSOCKET_DISCONNECT, ORDERS_WEBSOCKET_DISCONNECTED, ORDERS_WEBSOCKET_ERROR, ORDERS_WEBSOCKET_MESSAGE_RECEIVED, ORDERS_WEBSOCKET_SEND_MESSAGE, WEBSOCKET_CONNECT, WEBSOCKET_CONNECTED, WEBSOCKET_DISCONNECT, WEBSOCKET_DISCONNECTED, WEBSOCKET_ERROR, WEBSOCKET_MESSAGE_RECEIVED, WEBSOCKET_SEND_MESSAGE } from "../constants/ws";
import { useSelector } from "react-redux";


const rootReducer = combineReducers({
  ingridient: listAllGetIngridients,
  details: viewedIngridients,
  tab: activeTab,
  burgerConstructor: burgerConstructor,
  order: order,
  user: user,
  resetPassword: resetPassword,
  ws: ws,
  singleOrder: getOrder,
});
const websocketMiddlewareAll = createWebSocketMiddleware({
  wsUrl: 'wss://norma.nomoreparties.space/orders',
  actions: {
    connect: WEBSOCKET_CONNECT,
    disconnect: WEBSOCKET_DISCONNECT,
    sendMessage: WEBSOCKET_SEND_MESSAGE,
    onConnected: WEBSOCKET_CONNECTED,
    onDisconnected: WEBSOCKET_DISCONNECTED,
    onMessageReceived: WEBSOCKET_MESSAGE_RECEIVED,
    onError: WEBSOCKET_ERROR,
  },
});

 

const websocketMiddlewareOrders = createWebSocketMiddleware({
  wsUrl: `wss://norma.nomoreparties.space/orders`,
  actions: {
    connect: ORDERS_WEBSOCKET_CONNECT,
    disconnect: ORDERS_WEBSOCKET_DISCONNECT,
    sendMessage: ORDERS_WEBSOCKET_SEND_MESSAGE,
    onConnected: ORDERS_WEBSOCKET_CONNECTED,
    onDisconnected: ORDERS_WEBSOCKET_DISCONNECTED,
    onMessageReceived: ORDERS_WEBSOCKET_MESSAGE_RECEIVED,
    onError: ORDERS_WEBSOCKET_ERROR,
  },
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(websocketMiddlewareAll).concat(websocketMiddlewareOrders),
  devTools: process.env.NODE_ENV !== "production",
});

