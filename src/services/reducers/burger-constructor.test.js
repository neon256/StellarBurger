import { burgerConstructor } from './burger-constructor';
import { BUN_SAVE, CHANGE_INGREDIENTS_POSITION, INGREDIENTS_REMOVE, INGREDIENTS_SAVE, SET_INGREDIENTS_PRICE } from '../constants/burger-constructor';
import { IIngredients } from '../type/data';

describe('burgerConstructor reducer', () => {
  const initialState = {
    bun: null,
    ingredients: [],
    isDraggingBun: false,
    isDraggingIng: false,
  };

  it('should return the initial state', () => {
    expect(burgerConstructor(undefined, {})).toEqual(initialState);
  });

  it('should handle INGREDIENTS_SAVE', () => {
    const ingredient= { uuid: '1', _id:'f12', name: 'Bun', price: 50, type: 'bun', proteins: 44, fat: 44, carbohydrates: 44, calories: 44, image: 'url', image_mobile: 'url', image_large: 'url', __v: 12 };
    const action = { type: INGREDIENTS_SAVE, value: ingredient };
    const expectedState = {
      ...initialState,
      ingredients: [ingredient],
    };
    expect(burgerConstructor(initialState, action)).toEqual(expectedState);
  });

  it('should handle BUN_SAVE', () => {
    const bun = { uuid: '1', _id:'f12', name: 'Bun', price: 50, type: 'bun', proteins: 44, fat: 44, carbohydrates: 44, calories: 44, image: 'url', image_mobile: 'url', image_large: 'url', __v: 12 };
    const action = { type: BUN_SAVE, value: bun };
    const expectedState = {
      ...initialState,
      bun: bun,
    };
    expect(burgerConstructor(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_INGREDIENTS_PRICE', () => {
    const action = { type: SET_INGREDIENTS_PRICE, dragBun: true, dragIng: false };
    const expectedState = {
      ...initialState,
      isDraggingBun: true,
      isDraggingIng: false,
    };
    expect(burgerConstructor(initialState, action)).toEqual(expectedState);
  });

  it('should handle CHANGE_INGREDIENTS_POSITION', () => {
    const ingredients = [
      { uuid: '1', _id:'f12', name: 'Bun', price: 50, type: 'bun', proteins: 44, fat: 44, carbohydrates: 44, calories: 44, image: 'url', image_mobile: 'url', image_large: 'url', __v: 12 },
      { uuid: '2', _id:'f12', name: 'Bun', price: 50, type: 'bun', proteins: 44, fat: 44, carbohydrates: 44, calories: 44, image: 'url', image_mobile: 'url', image_large: 'url', __v: 12 },
    ];
    const changedIngredients = [
      { uuid: '1', _id:'f12', name: 'Bun', price: 50, type: 'bun', proteins: 44, fat: 44, carbohydrates: 44, calories: 44, image: 'url', image_mobile: 'url', image_large: 'url', __v: 12 },
      { uuid: '2', _id:'f12', name: 'Bun', price: 50, type: 'bun', proteins: 44, fat: 44, carbohydrates: 44, calories: 44, image: 'url', image_mobile: 'url', image_large: 'url', __v: 12 },
    ];
    const action = { type: CHANGE_INGREDIENTS_POSITION, change: changedIngredients };
    const stateWithIngredients = {
      ...initialState,
      ingredients: ingredients,
    };
    const expectedState = {
      ...initialState,
      ingredients: changedIngredients,
    };
    expect(burgerConstructor(stateWithIngredients, action)).toEqual(expectedState);
  });

  it('should handle INGREDIENTS_REMOVE', () => {
    const ingredients = [
      { uuid: '1', _id:'f12', name: 'Bun', price: 50, type: 'bun', proteins: 44, fat: 44, carbohydrates: 44, calories: 44, image: 'url', image_mobile: 'url', image_large: 'url', __v: 12 },
      { uuid: '2', _id:'f12', name: 'Bun', price: 50, type: 'bun', proteins: 44, fat: 44, carbohydrates: 44, calories: 44, image: 'url', image_mobile: 'url', image_large: 'url', __v: 12 },
    ];
    const action = { type: INGREDIENTS_REMOVE, id: '1' };
    const stateWithIngredients = {
      ...initialState,
      ingredients: ingredients,
    };
    const expectedState = {
      ...initialState,
      ingredients: [{ uuid: '2', _id:'f12', name: 'Bun', price: 50, type: 'bun', proteins: 44, fat: 44, carbohydrates: 44, calories: 44, image: 'url', image_mobile: 'url', image_large: 'url', __v: 12 }],
    };
    expect(burgerConstructor(stateWithIngredients, action)).toEqual(expectedState);
  });
});