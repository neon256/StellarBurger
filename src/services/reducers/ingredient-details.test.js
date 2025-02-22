import { initialDetails, viewedIngridients } from './ingredient-details';
import { INGRIDIENTS_DETAIL, DELETE_INGRIDIENTS_DETAIL } from '../constants/ingredient-details';

describe('viewedIngridients reducer', () => {
  

  it('should return the initial state', () => {
    expect(viewedIngridients(undefined, {})).toEqual(initialDetails);
  });

  it('should handle INGRIDIENTS_DETAIL', () => {
    const ingredient = { uuid: '1', _id:'f12', name: 'Bun', price: 50, type: 'bun', proteins: 44, fat: 44, carbohydrates: 44, calories: 44, image: 'url', image_mobile: 'url', image_large: 'url', __v: 12 };
    const action = { type: INGRIDIENTS_DETAIL, value: ingredient };
    const expectedState = {
      data: ingredient,
    };
    expect(viewedIngridients(initialDetails, action)).toEqual(expectedState);
  });

  it('should handle DELETE_INGRIDIENTS_DETAIL', () => {
    const action = { type: DELETE_INGRIDIENTS_DETAIL };
    const stateWithIngredient = {
      data: { uuid: '1', _id:'f12', name: 'Bun', price: 50, type: 'bun', proteins: 44, fat: 44, carbohydrates: 44, calories: 44, image: 'url', image_mobile: 'url', image_large: 'url', __v: 12 },
    };
    const expectedState = {
      data: undefined,
    };
    expect(viewedIngridients(stateWithIngredient, action)).toEqual(expectedState);
  });
});