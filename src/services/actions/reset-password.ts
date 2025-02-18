import { BASE_URL } from "../../utils/Api";
import { checkResponse } from "../../utils/chekResponse";
import { useAppDispatch } from "../../utils/hook";
import { POST_FORGOT_PASSWORD_FAILED, POST_FORGOT_PASSWORD_REQUEST, POST_FORGOT_PASSWORD_SUCCESS, POST_RESET_PASSWORD_FAILED, POST_RESET_PASSWORD_REQUEST, POST_RESET_PASSWORD_SUCCESS } from "../constants/reset-password";
import { AppDispatch } from "../type/data";


export interface IPostForgotPasswordRequestAction {
    readonly type: typeof POST_FORGOT_PASSWORD_REQUEST
}
export interface IPostForgotPasswordFailedAction {
    readonly type: typeof POST_FORGOT_PASSWORD_FAILED
}
export interface IPostForgotPasswordSuccessAction {
    readonly type: typeof POST_FORGOT_PASSWORD_SUCCESS
    value: {
        success: boolean,
        message: string
      } 
}

export interface IPostResetPasswordRequestAction {
    readonly type: typeof POST_RESET_PASSWORD_REQUEST
}
export interface IPostResetPasswordFailedAction {
    readonly type: typeof POST_RESET_PASSWORD_FAILED
}
export interface IPostResetPasswordSuccessAction {
    readonly type: typeof POST_RESET_PASSWORD_SUCCESS
    value:{
        success: boolean,
        message: string
      } 
}

export type TResetPassword = 
    | IPostForgotPasswordFailedAction
    | IPostForgotPasswordRequestAction
    | IPostForgotPasswordSuccessAction
    | IPostResetPasswordFailedAction
    | IPostResetPasswordRequestAction
    | IPostResetPasswordSuccessAction

export function postForgotPassword(email: string, navigate: (children:string)=>void){
    return function (dispatch = useAppDispatch()){
        dispatch({type: POST_FORGOT_PASSWORD_REQUEST})
        const res = fetch(`${BASE_URL}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({email: email})
        })
        .then(checkResponse)
        .then((data)=>{
            console.log(data)
            localStorage.setItem('resetPassword', 'true');
            dispatch({type:POST_FORGOT_PASSWORD_SUCCESS, value: data})
            navigate('/reset-password')
        })
        .catch((error)=>{
            console.log(error)
            dispatch({type: POST_FORGOT_PASSWORD_FAILED})
        })
    }
}

export function postResetPassword(password: string, token: string, navigate: (children:string)=>void){
    return function (dispatch = useAppDispatch()){
        dispatch({type: POST_RESET_PASSWORD_REQUEST})
        const res = fetch(`${BASE_URL}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({password: password, token: token})
        })
        .then(checkResponse)
        .then((data)=>{
            console.log(data)
            localStorage.removeItem('resetPassword')
            dispatch({type:POST_RESET_PASSWORD_SUCCESS, value: data})
            navigate('/login')
        })
        .catch((error)=>{
            console.log(error)
            dispatch({type: POST_RESET_PASSWORD_FAILED})
        })
    }
}