import { order, getOrder, initialOrder, getOrderState } from './order';
import {
  POST_INGRIDIENTS_REQUEST,
  POST_INGRIDIENTS_SUCCESS,
  POST_INGRIDIENTS_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from '../constants/order';
describe('order reducer', () => {
 

  it('should return the initial state', () => {
    expect(order(undefined, {})).toEqual(initialOrder);
  });

  it('should handle POST_INGRIDIENTS_REQUEST', () => {
    const action = { type: POST_INGRIDIENTS_REQUEST };
    const expectedState = {
      ...initialOrder,
      order: null,
      load: true,
      dataRequest: true,
    };
    expect(order(initialOrder, action)).toEqual(expectedState);
  });

  it('should handle POST_INGRIDIENTS_SUCCESS', () => {
    const orderNumber = 75943;
    const action = { type: POST_INGRIDIENTS_SUCCESS, value: orderNumber };
    const expectedState = {
      load: false,
      dataRequest: false,
      dataFailed: false,
      order: orderNumber,
    };
    expect(order(initialOrder, action)).toEqual(expectedState);
  });

  it('should handle POST_INGRIDIENTS_FAILED', () => {
    const action = { type: POST_INGRIDIENTS_FAILED };
    const expectedState = {
      ...initialOrder,
      load: false,
      dataRequest: false,
      dataFailed: true,
    };
    expect(order(initialOrder, action)).toEqual(expectedState);
  });
});

describe('getOrder reducer', () => {
  

  it('should return the initial state', () => {
    expect(getOrder(undefined, {})).toEqual(getOrderState);
  });

  it('should handle GET_ORDER_REQUEST', () => {
    const action = { type: GET_ORDER_REQUEST };
    const expectedState = {
      ...getOrderState,
      order: [],
      load: true,
      dataRequest: true,
    };
    expect(getOrder(getOrderState, action)).toEqual(expectedState);
  });

  it('should handle GET_ORDER_SUCCESS', () => {
    const orderData = ["f12", "f12", "f12"]; 
    const action = { type: GET_ORDER_SUCCESS, value: orderData };
    const expectedState = {
      load: false,
      dataRequest: false,
      dataFailed: false,
      order: orderData,
    };
    expect(getOrder(getOrderState, action)).toEqual(expectedState);
  });

  it('should handle GET_ORDER_FAILED', () => {
    const action = { type: GET_ORDER_FAILED };
    const expectedState = {
      ...getOrderState,
      load: false,
      dataRequest: false,
      dataFailed: true,
    };
    expect(getOrder(getOrderState, action)).toEqual(expectedState);
  });
});