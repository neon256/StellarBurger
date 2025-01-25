import { BASE_URL } from "../../utils/Api";
import { checkResponse } from "../../utils/chekResponse";

export const POST_FORGOT_PASSWORD_REQUEST = "POST_FORGOT_PASSWORD_REQUEST";
export const POST_FORGOT_PASSWORD_FAILED = "POST_FORGOT_PASSWORD_FAILED";
export const POST_FORGOT_PASSWORD_SUCCESS = "POST_FORGOT_PASSWORD_SUCCESS";

export const POST_RESET_PASSWORD_REQUEST = "POST_RESET_PASSWORD_REQUEST";
export const POST_RESET_PASSWORD_FAILED = "POST_RESET_PASSWORD_FAILED";
export const POST_RESET_PASSWORD_SUCCESS = "POST_RESET_PASSWORD_SUCCESS";

export function postForgotPassword(email, navigate){
    return function (dispatch){
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

export function postResetPassword(password, token, navigate){
    return function (dispatch){
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