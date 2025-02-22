import { listAllGetIngridients, activeTab, initialState, initialActiveTab } from './burger-ingridients';
import { GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_SUCCESS, GET_INGRIDIENTS_FAILED, ACTIVE_TAB, CHANGE_TAB } from '../constants/burger-ingridients';

describe('listAllGetIngridients reducer', () => {
  

  it('should return the initial state', () => {
    expect(listAllGetIngridients(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_INGRIDIENTS_REQUEST', () => {
    const action = { type: GET_INGRIDIENTS_REQUEST };
    const expectedState = {
      ...initialState,
      dataRequest: true,
    };
    expect(listAllGetIngridients(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_INGRIDIENTS_SUCCESS', () => {
    const ingredients = [
        { uuid: '1', _id:'f12', name: 'Bun', price: 50, type: 'bun', proteins: 44, fat: 44, carbohydrates: 44, calories: 44, image: 'url', image_mobile: 'url', image_large: 'url', __v: 12 },
        { uuid: '2', _id:'f12', name: 'Bun', price: 50, type: 'bun', proteins: 44, fat: 44, carbohydrates: 44, calories: 44, image: 'url', image_mobile: 'url', image_large: 'url', __v: 12 },
    ];
    const action = { type: GET_INGRIDIENTS_SUCCESS, value: ingredients };
    const expectedState = {
      data: ingredients,
      load: false,
      dataRequest: false,
      dataFailed: false,
    };
    expect(listAllGetIngridients(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_INGRIDIENTS_FAILED', () => {
    const action = { type: GET_INGRIDIENTS_FAILED };
    const expectedState = {
      ...initialState,
      load: false,
      dataFailed: true,
      dataRequest: false,
    };
    expect(listAllGetIngridients(initialState, action)).toEqual(expectedState);
  });
});

describe('activeTab reducer', () => {
  

  it('should return the initial state', () => {
    expect(activeTab(undefined, {})).toEqual(initialActiveTab);
  });

  it('should handle ACTIVE_TAB', () => {
    const action = { type: ACTIVE_TAB, value: "one" };
    const expectedState = {
      tab: "one",
    };
    expect(activeTab(initialActiveTab, action)).toEqual(expectedState);
  });

  it('should handle CHANGE_TAB', () => {
    const action = { type: CHANGE_TAB, value: 'three' };
    const expectedState = {
      tab: 'three',
    };
    expect(activeTab(initialActiveTab, action)).toEqual(expectedState);
  });
});