import { ORDERS_WEBSOCKET_CONNECT, ORDERS_WEBSOCKET_DISCONNECT, ORDERS_WEBSOCKET_MESSAGE_RECEIVED, WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT, WEBSOCKET_MESSAGE_RECEIVED } from "../constants/ws";
import { IOrder } from "../type/data";


export interface IWebsocketConnect {
      readonly type: typeof WEBSOCKET_CONNECT
}
export interface IWebsocketMessageReceived {
    readonly type: typeof WEBSOCKET_MESSAGE_RECEIVED
    readonly payload: string
}
export interface IWebsocketDisconnect {
    readonly type: typeof WEBSOCKET_DISCONNECT
}
export interface IOrdersWebsocketConnect {
    readonly type: typeof ORDERS_WEBSOCKET_CONNECT
}
export interface IOrdersWebsocketMessageReceived {
  readonly type: typeof ORDERS_WEBSOCKET_MESSAGE_RECEIVED
  readonly payload: string
}
export interface IOrdersWebsocketDisconnect {
  readonly type: typeof ORDERS_WEBSOCKET_DISCONNECT
}

export type TWS = 
    | IWebsocketConnect
    | IWebsocketDisconnect
    | IWebsocketMessageReceived
    | IOrdersWebsocketConnect
    | IOrdersWebsocketDisconnect
    | IOrdersWebsocketMessageReceived