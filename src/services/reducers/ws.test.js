import { initialState, ws } from "./ws";
import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_MESSAGE_RECEIVED,
  WEBSOCKET_DISCONNECT,
  ORDERS_WEBSOCKET_CONNECT,
  ORDERS_WEBSOCKET_MESSAGE_RECEIVED,
  ORDERS_WEBSOCKET_DISCONNECT,
} from "../constants/ws";

describe("ws reducer", () => {
  
  it("should return the initial state", () => {
    expect(ws(undefined, {})).toEqual(initialState);
  });

  it("should handle WEBSOCKET_CONNECT", () => {
    const action = { type: WEBSOCKET_CONNECT };
    const expectedState = {
      ...initialState,
      isConnecting: true,
    };
    expect(ws(initialState, action)).toEqual(expectedState);
  });

  it("should handle WEBSOCKET_MESSAGE_RECEIVED", () => {
    const payload = JSON.stringify([
      {
        success: true,
        orders: [
          {
            _id: "f12",
            ingredients: ["234d"],
            status: "done",
            name: "Bun",
            createdAt: 234,
            updatedAt: 234,
          },
        ],
        total: 1234,
        totalToday: 123,
      },
    ]);
    const action = { type: WEBSOCKET_MESSAGE_RECEIVED, payload };
    const expectedState = {
      ...initialState,
      feed: [
        {
          success: true,
          orders: [
            {
              _id: "f12",
              ingredients: ["234d"],
              status: "done",
              name: "Bun",
              createdAt: 234,
              updatedAt: 234,
            },
          ],
          total: 1234,
          totalToday: 123,
        },
      ],
    };
    expect(ws(initialState, action)).toEqual(expectedState);
  });

  it("should handle WEBSOCKET_DISCONNECT", () => {
    const action = { type: WEBSOCKET_DISCONNECT };
    const expectedState = {
      ...initialState,
      isConnecting: false,
    };
    expect(ws(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDERS_WEBSOCKET_CONNECT", () => {
    const action = { type: ORDERS_WEBSOCKET_CONNECT };
    const expectedState = {
      ...initialState,
      isConnecting: true,
    };
    expect(ws(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDERS_WEBSOCKET_MESSAGE_RECEIVED", () => {
    const payload = JSON.stringify([
        {
          success: true,
          orders: [
            {
              _id: "f12",
              ingredients: ["234d"],
              status: "done",
              name: "Bun",
              createdAt: 234,
              updatedAt: 234,
            },
          ],
          total: 1234,
          totalToday: 123,
        },
      ]);
    const action = { type: ORDERS_WEBSOCKET_MESSAGE_RECEIVED, payload };
    const expectedState = {
      ...initialState,
      orders: [
        {
          success: true,
          orders: [
            {
              _id: "f12",
              ingredients: ["234d"],
              status: "done",
              name: "Bun",
              createdAt: 234,
              updatedAt: 234,
            },
          ],
          total: 1234,
          totalToday: 123,
        },
      ],
    };
    expect(ws(initialState, action)).toEqual(expectedState);
  });

  it("should handle ORDERS_WEBSOCKET_DISCONNECT", () => {
    const action = { type: ORDERS_WEBSOCKET_DISCONNECT };
    const expectedState = {
      ...initialState,
      isConnecting: false,
    };
    expect(ws(initialState, action)).toEqual(expectedState);
  });
});
