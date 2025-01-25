import { data } from "react-router-dom";
import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, PATCH_USER_FAILED, PATCH_USER_REQUEST, PATCH_USER_SUCCESS, POST_AUTH_FAILED, POST_AUTH_REQUEST, POST_AUTH_SUCCESS, POST_REGISTER_FAILED, POST_REGISTER_REQUEST, POST_REGISTER_SUCCESS } from "../actions/user";

const initialAuth = {
    email:'',
    name:'',
    accessToken: '',
    load: false,
    dataRequest: false,
    dataFailed: false,
}

export const user = (state = initialAuth, action) => {
    switch (action.type) {
        case POST_AUTH_REQUEST: {
            return {
                ...state,
                dataRequest: true,
                load: true,
            }
        }
        case POST_AUTH_SUCCESS: {
            return {
                email: action.value.user.email,
                name: action.value.user.name,
                accessToken: action.value.accessToken,
                dataRequest: false,
                load: false,
                dataFailed: false
            }
        }
        case POST_AUTH_FAILED: {
            return {
                ...state,
                load: false,
                dataRequest:false,
                dataFailed: true
            }
        }
        case POST_REGISTER_REQUEST: {
            return {
                ...state,
                dataRequest: true,
                load: true,
            }
        }
        case POST_REGISTER_SUCCESS: {
            return {
                email: action.value.user.email,
                name: action.value.user.name,
                accessToken: action.value.accessToken,
                dataRequest: false,
                load: false,
                dataFailed: false
            }
        }
        case POST_REGISTER_FAILED: {
            return {
                ...state,
                load: false,
                dataRequest:false,
                dataFailed: true
            }
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                dataRequest: true,
                load: true,
            }
        }
        case GET_USER_SUCCESS: {
            return {
                email: action.value.user.email,
                name: action.value.user.name,
                accessToken: action.value.accessToken,
                dataRequest: false,
                load: false,
                dataFailed: false
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                load: false,
                dataRequest:false,
                dataFailed: true
            }
        }
        case PATCH_USER_REQUEST: {
            return {
                ...state,
                dataRequest: true,
                load: true,
            }
        }
        case PATCH_USER_SUCCESS: {
            return {
                email: action.value.user.email,
                name: action.value.user.name,
                accessToken: action.value.accessToken,
                dataRequest: false,
                load: false,
                dataFailed: false
            }
        }
        case PATCH_USER_FAILED: {
            return {
                ...state,
                load: false,
                dataRequest:false,
                dataFailed: true
            }
        }
        default: {
            return state
        }

    }
}