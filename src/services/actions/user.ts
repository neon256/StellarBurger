import { BASE_URL } from "../../utils/Api";
import { checkResponse } from "../../utils/chekResponse";
import {
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  PATCH_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  POST_AUTH_FAILED,
  POST_AUTH_REQUEST,
  POST_AUTH_SUCCESS,
  POST_REGISTER_FAILED,
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_RESET_TOKEN_FAILED,
  POST_RESET_TOKEN_REQUEST,
  POST_RESET_TOKEN_SUCCESS,
} from "../constants/user";
import { AppDispatch } from "../type/data";

export interface IPostAuthRequestAction {
  readonly type: typeof POST_AUTH_REQUEST;
}
export interface IPostAuthFailedAction {
  readonly type: typeof POST_AUTH_FAILED;
}
export interface IPostAuthSuccessAction {
  readonly type: typeof POST_AUTH_SUCCESS;
  readonly value: any;
}

export interface IPostRegisterSuccessAction {
  readonly type: typeof POST_REGISTER_SUCCESS;
  readonly value: any;
}
export interface IPostRegisterFailedAction {
  readonly type: typeof POST_REGISTER_FAILED;
}
export interface IPostRegisterRequestAction {
  readonly type: typeof POST_REGISTER_REQUEST;
}

export interface IPatchUserRequestAction {
  readonly type: typeof PATCH_USER_REQUEST;
}
export interface IPatchUserFailedAction {
  readonly type: typeof PATCH_USER_FAILED;
}
export interface IPatchUserSuccessAction {
  readonly type: typeof PATCH_USER_SUCCESS;
  readonly value: any;
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}
export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly value: any;
}

export interface IPostResetTokenRequestAction {
  readonly type: typeof POST_RESET_TOKEN_REQUEST;
}
export interface IPostResetTokenFailedAction {
  readonly type: typeof POST_RESET_TOKEN_FAILED;
}
export interface IPostResetTokenSuccessAction {
  readonly type: typeof POST_RESET_TOKEN_SUCCESS;
  readonly data: {
    success: boolean;
    accessToken: string;
    refreshToken: string;
  };
}

export type TUser =
  | IGetUserFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IPatchUserFailedAction
  | IPatchUserRequestAction
  | IPatchUserSuccessAction
  | IPostAuthFailedAction
  | IPostAuthRequestAction
  | IPostAuthSuccessAction
  | IPostRegisterFailedAction
  | IPostRegisterRequestAction
  | IPostRegisterSuccessAction
  | IPostResetTokenFailedAction
  | IPostResetTokenRequestAction
  | IPostResetTokenSuccessAction;

export function postAuth(email: string, password: string, navigate: any) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: POST_AUTH_REQUEST });
    const res = fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(checkResponse)
      .then((data) => {
        console.log(data);
        navigate("/profile");
        dispatch({ type: POST_AUTH_SUCCESS, value: data });
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("accessToken", data.accessToken);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: POST_AUTH_FAILED });
      });
  };
}
export function postRegister(
  email: string,
  password: string,
  name: string,
  navigate: any
) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: POST_REGISTER_REQUEST });
    const res = fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password, name: name }),
    })
      .then(checkResponse)
      .then((data) => {
        console.log(data);
        dispatch({ type: POST_REGISTER_SUCCESS, value: data });
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("accessToken", data.accessToken);
        navigate("/profile");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: POST_REGISTER_FAILED });
      });
  };
}

export function getUser(
  setLoad?: any,
  setNameValue?: any,
  setEmailValue?: any
) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: GET_USER_REQUEST });
    const res = fetch(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        authorization: `${localStorage.getItem("accessToken")}`,
      },
    })
      .then(checkResponse)
      .then((data) => {
        setLoad(false);
        setNameValue(data.user.name);
        setEmailValue(data.user.email);
        dispatch({ type: GET_USER_SUCCESS, value: data });
        return true;
      })
      .catch((error) => {
        console.log(error);
        setLoad(true)
        dispatch({ type: GET_USER_FAILED });
        return false;
      });
  };
}

export function patchUser(
  name: string,
  email: string,
  password: string,
  setNameValue: any,
  setEmailValue: any
) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: PATCH_USER_REQUEST });
    const res = fetch(`${BASE_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        dispatch({ type: PATCH_USER_SUCCESS, value: data });
        setNameValue(data.user.name);
        setEmailValue(data.user.email);
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: PATCH_USER_FAILED });
      });
  };
}

export function postResetToken() {
  return function (dispatch: AppDispatch) {
    dispatch({ type: POST_RESET_TOKEN_REQUEST });
    const res = fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    })
      .then(checkResponse)
      .then((data) => {
        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.removeItem("refreshToken");
        localStorage.setItem("refreshToken", data.refreshToken);
        console.log(data);
        dispatch({ type: POST_RESET_TOKEN_SUCCESS, data: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
