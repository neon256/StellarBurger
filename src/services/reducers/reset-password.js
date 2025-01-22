import { POST_FORGOT_PASSWORD_FAILED, POST_FORGOT_PASSWORD_REQUEST, POST_FORGOT_PASSWORD_SUCCESS, POST_RESET_PASSWORD_FAILED, POST_RESET_PASSWORD_REQUEST, POST_RESET_PASSWORD_SUCCESS } from "../actions/reset-password";

const initialResetPassword = {
    success: false,
    message: '',
    load: false,
    dataRequest: false,
    dataFailed: false,
}

export const resetPassword = (state = initialResetPassword, action) => {
    switch (action.type) {
        case POST_FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                load: true,
                dataRequest: true,
            }
        }

        case POST_FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                load: false,
                dataRequest: false,
                dataFailed: false,
                success: action.value.success,
                message: action.value.message,
            }
        }
        
        case POST_FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                load: false,
                dataRequest: false,
                dataFailed: true
            }
        }
        case POST_RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                load: true,
                dataRequest: true,
            }
        }

        case POST_RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                load: false,
                dataRequest: false,
                dataFailed: false,
                success: action.value.success,
                message: action.value.message,
            }
        }
        
        case POST_RESET_PASSWORD_FAILED: {
            return {
                ...state,
                load: false,
                dataRequest: false,
                dataFailed: true
            }
        }
        default:{
            return state
        }
    }
}