import { order, getOrder } from './order';
import {
  POST_INGRIDIENTS_REQUEST,
  POST_INGRIDIENTS_SUCCESS,
  POST_INGRIDIENTS_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from '../constants/order';
describe('order reducer', () => {
  const initialState = {
    load: false,
    dataRequest: false,
    dataFailed: false,
    order: null,
  };

  it('should return the initial state', () => {
    expect(order(undefined, {})).toEqual(initialState);
  });

  it('should handle POST_INGRIDIENTS_REQUEST', () => {
    const action = { type: POST_INGRIDIENTS_REQUEST };
    const expectedState = {
      ...initialState,
      order: null,
      load: true,
      dataRequest: true,
    };
    expect(order(initialState, action)).toEqual(expectedState);
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
    expect(order(initialState, action)).toEqual(expectedState);
  });

  it('should handle POST_INGRIDIENTS_FAILED', () => {
    const action = { type: POST_INGRIDIENTS_FAILED };
    const expectedState = {
      ...initialState,
      load: false,
      dataRequest: false,
      dataFailed: true,
    };
    expect(order(initialState, action)).toEqual(expectedState);
  });
});

describe('getOrder reducer', () => {
  const initialState = {
    order: [],
    load: false,
    dataRequest: false,
    dataFailed: false,
  };

  it('should return the initial state', () => {
    expect(getOrder(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_ORDER_REQUEST', () => {
    const action = { type: GET_ORDER_REQUEST };
    const expectedState = {
      ...initialState,
      order: [],
      load: true,
      dataRequest: true,
    };
    expect(getOrder(initialState, action)).toEqual(expectedState);
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
    expect(getOrder(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_ORDER_FAILED', () => {
    const action = { type: GET_ORDER_FAILED };
    const expectedState = {
      ...initialState,
      load: false,
      dataRequest: false,
      dataFailed: true,
    };
    expect(getOrder(initialState, action)).toEqual(expectedState);
  });
});