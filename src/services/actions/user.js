
import { BASE_URL } from "../../utils/Api";
import { checkResponse } from "../../utils/chekResponse";

export const POST_AUTH_REQUEST = "POST_AUTH_REQUEST";
export const POST_AUTH_FAILED = "POST_AUTH_FAILED";
export const POST_AUTH_SUCCESS = "POST_AUTH_SUCCESS";

export const POST_REGISTER_REQUEST = "POST_REGISTER_REQUEST";
export const POST_REGISTER_FAILED = "POST_REGISTER_FAILED";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";

export const PATCH_USER_REQUEST = "PATCH_USER_REQUEST";
export const PATCH_USER_FAILED = "PATCH_USER_FAILED";
export const PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";

export const POST_RESET_TOKEN_REQUEST = "POST_RESET_TOKEN_REQUEST";
export const POST_RESET_TOKEN_FAILED = "POST_RESET_TOKEN_FAILED";
export const POST_RESET_TOKEN_SUCCESS = "POST_RESET_TOKEN_SUCCESS";

export function postAuth(email, password, navigate) {
  return function (dispatch) {
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
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken)  
        window.location.reload()
    })
      .catch((error) => {
        console.log(error);
        dispatch({ type: POST_AUTH_FAILED });
      });
  };
}
export function postRegister(email, password, name, navigate) {
  return function (dispatch) {
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
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        navigate("/profile");
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: POST_REGISTER_FAILED });
      });
  };
}

export function getUser(setLoad, setNameValue, setEmailValue){
  return function(dispatch){
    dispatch({type: GET_USER_REQUEST})
    const res = fetch(`${BASE_URL}/auth/user`, {
      method: 'GET',
      headers:{
        'authorization':localStorage.getItem('accessToken')
      }
    })
    .then(checkResponse)
    .then((data)=>{
      setLoad(false)
      setNameValue(data.user.name)
      setEmailValue(data.user.email)
      dispatch({type: GET_USER_SUCCESS, value: data})
    })
    .catch((error)=>{
      console.log(error)
      dispatch({type: GET_USER_FAILED})
    })
  }
}

export function patchUser(name, email, password, setNameValue, setEmailValue) {
    return function(dispatch){
      dispatch({type: PATCH_USER_REQUEST})
      const res = fetch(`${BASE_URL}/auth/user`,{
        method:"PATCH",
        headers:{
          'Content-Type':'application/json',
          'authorization':localStorage.getItem('accessToken')
        },
        body:JSON.stringify({
          name: name, 
          email: email, 
          password: password
        })
      })
      .then(checkResponse)
      .then((data)=>{
        dispatch({type: PATCH_USER_SUCCESS, value: data})
        setNameValue(data.user.name)
        setEmailValue(data.user.email)
      })
      .catch((error)=>{
        console.log(error)
        dispatch({type: PATCH_USER_FAILED})
      });
    }
}

export function postResetToken(){
  return function(dispatch){
    dispatch({type: POST_RESET_TOKEN_REQUEST})
    const res = fetch(`${BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({'token': localStorage.getItem('refreshToken')})
    })
    .then(checkResponse)
    .then((data)=>{
      localStorage.removeItem('accessToken')
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.removeItem('refreshToken')
      localStorage.setItem('refreshToken', data.refreshToken)
      console.log(data)
    })
    .catch(error=>{
      console.log(error)
    })
  }
}
