import { TResetPassword } from "../actions/reset-password";
import {
  POST_FORGOT_PASSWORD_FAILED,
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_FAILED,
  POST_RESET_PASSWORD_REQUEST,
  POST_RESET_PASSWORD_SUCCESS,
} from "../constants/reset-password";

type TInitialResetPassword = {
  success: boolean,
  message: string,
  load: boolean,
  dataRequest: boolean,
  dataFailed: boolean,
};

export const initialResetPassword: TInitialResetPassword = {
  success: false,
  message: "",
  load: false,
  dataRequest: false,
  dataFailed: false,
};

export const resetPassword = (state = initialResetPassword, action:TResetPassword): TInitialResetPassword => {
  switch (action.type) {
    case POST_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        load: true,
        dataRequest: true,
      };
    }

    case POST_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        load: false,
        dataRequest: false,
        dataFailed: false,
        success: action.value.success,
        message: action.value.message,
      };
    }

    case POST_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        load: false,
        dataRequest: false,
        dataFailed: true,
      };
    }
    case POST_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        load: true,
        dataRequest: true,
      };
    }

    case POST_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        load: false,
        dataRequest: false,
        dataFailed: false,
        success: action.value.success,
        message: action.value.message,
      };
    }

    case POST_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        load: false,
        dataRequest: false,
        dataFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
