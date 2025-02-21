import { user } from './user';
import {
  POST_AUTH_REQUEST,
  POST_AUTH_SUCCESS,
  POST_AUTH_FAILED,
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  POST_RESET_TOKEN_SUCCESS,
} from '../constants/user';

describe('user reducer', () => {
  const initialState = {
    email: '',
    name: '',
    accessToken: '',
    load: false,
    dataRequest: false,
    dataFailed: false,
  };

  it('should return the initial state', () => {
    expect(user(undefined, {})).toEqual(initialState);
  });

  it('should handle POST_AUTH_REQUEST', () => {
    const action = { type: POST_AUTH_REQUEST };
    const expectedState = {
      ...initialState,
      dataRequest: true,
      load: true,
    };
    expect(user(initialState, action)).toEqual(expectedState);
  });

  it('should handle POST_AUTH_SUCCESS', () => {
    const action = {
      type: POST_AUTH_SUCCESS,
      value: {
        user: { email: 'test@example.com', name: 'Test User' },
        accessToken: 'test-access-token',
      },
    };
    const expectedState = {
      email: 'test@example.com',
      name: 'Test User',
      accessToken: 'test-access-token',
      dataRequest: false,
      load: false,
      dataFailed: false,
    };
    expect(user(initialState, action)).toEqual(expectedState);
  });

  it('should handle POST_AUTH_FAILED', () => {
    const action = { type: POST_AUTH_FAILED };
    const expectedState = {
      ...initialState,
      load: false,
      dataRequest: false,
      dataFailed: true,
    };
    expect(user(initialState, action)).toEqual(expectedState);
  });

  it('should handle POST_REGISTER_REQUEST', () => {
    const action = { type: POST_REGISTER_REQUEST };
    const expectedState = {
      ...initialState,
      dataRequest: true,
      load: true,
    };
    expect(user(initialState, action)).toEqual(expectedState);
  });

  it('should handle POST_REGISTER_SUCCESS', () => {
    const action = {
      type: POST_REGISTER_SUCCESS,
      value: {
        user: { email: 'test@example.com', name: 'Test User' },
        accessToken: 'test-access-token',
      },
    };
    const expectedState = {
      email: 'test@example.com',
      name: 'Test User',
      accessToken: 'test-access-token',
      dataRequest: false,
      load: false,
      dataFailed: false,
    };
    expect(user(initialState, action)).toEqual(expectedState);
  });

  it('should handle POST_REGISTER_FAILED', () => {
    const action = { type: POST_REGISTER_FAILED };
    const expectedState = {
      ...initialState,
      load: false,
      dataRequest: false,
      dataFailed: true,
    };
    expect(user(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_USER_REQUEST', () => {
    const action = { type: GET_USER_REQUEST };
    const expectedState = {
      ...initialState,
      dataRequest: true,
      load: true,
    };
    expect(user(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_USER_SUCCESS', () => {
    const action = {
      type: GET_USER_SUCCESS,
      value: {
        user: { email: 'test@example.com', name: 'Test User' },
      },
    };
    const expectedState = {
      ...initialState,
      email: 'test@example.com',
      name: 'Test User',
      dataRequest: false,
      load: false,
      dataFailed: false,
    };
    expect(user(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_USER_FAILED', () => {
    const action = { type: GET_USER_FAILED };
    const expectedState = {
      ...initialState,
      load: false,
      dataRequest: false,
      dataFailed: true,
    };
    expect(user(initialState, action)).toEqual(expectedState);
  });

  it('should handle PATCH_USER_REQUEST', () => {
    const action = { type: PATCH_USER_REQUEST };
    const expectedState = {
      ...initialState,
      dataRequest: true,
      load: true,
    };
    expect(user(initialState, action)).toEqual(expectedState);
  });

  it('should handle PATCH_USER_SUCCESS', () => {
    const action = {
      type: PATCH_USER_SUCCESS,
      value: {
        user: { email: 'updated@example.com', name: 'Updated User' },
        accessToken: 'updated-access-token',
      },
    };
    const expectedState = {
      email: 'updated@example.com',
      name: 'Updated User',
      accessToken: 'updated-access-token',
      dataRequest: false,
      load: false,
      dataFailed: false,
    };
    expect(user(initialState, action)).toEqual(expectedState);
  });

  it('should handle PATCH_USER_FAILED', () => {
    const action = { type: PATCH_USER_FAILED };
    const expectedState = {
      ...initialState,
      load: false,
      dataRequest: false,
      dataFailed: true,
    };
    expect(user(initialState, action)).toEqual(expectedState);
  });

  it('should handle POST_RESET_TOKEN_SUCCESS', () => {
    const action = {
      type: POST_RESET_TOKEN_SUCCESS,
      data: { accessToken: 'new-access-token' },
    };
    const expectedState = {
      ...initialState,
      accessToken: 'new-access-token',
      dataRequest: false,
      load: false,
      dataFailed: false,
    };
    expect(user(initialState, action)).toEqual(expectedState);
  });
});