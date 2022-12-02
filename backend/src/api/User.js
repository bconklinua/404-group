import axios from 'axios'
import { BASE_URL } from './api'
export function authenticate(param = {}){
    const url = `${BASE_URL}/api/auth/login/`
    const body = {
        email: param.email,
        password: param.password,
        
    }
    console.log(param)

    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
        }
    }).then((response) =>{
        console.log(response)
        localStorage.clear()
        localStorage.setItem("authorID", response.data.id)
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("email", response.data.email)
        return response;
    }).catch((error)=>{
        return error.response;
    })
}

export function postUser(param = {}){
    const url = `${BASE_URL}/api/auth/register/`
    const body = {
        email: param.email,
        username: param.username,
        password: param.password,
    }
    console.log(param)
    return axios.post(url, body, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
        },
    }).then((response) =>{
        return response;
    }).catch((error)=>{
        return error.response;
    })
}

export function getToken(param = {}){
    // Gets a token
    const url = `${BASE_URL}/api/token/obtain/`
    const body = {
        email: param.email,
        password: param.password,
        
    }
    console.log(param)

    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
        }
    }).then((response) =>{
        localStorage.setItem("access_token", response.data.access)
        localStorage.setItem("refresh_token", response.data.refresh)
        return response;
    }).catch((error)=>{
        return error.response;
    })
}
export function refreshToken(){
    // Gets a new token using refresh token
    const url = `${BASE_URL}/api/token/refresh/`
    return axios.post(url, {refresh: localStorage.getItem('refresh_token')}).then((response)=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        return response
    }).catch((error)=>{
        return error.response
    })
}

export function getAllUsers(){
    const url = `${BASE_URL}/authors/`
    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
            Authorization: `JWT ${localStorage.getItem("access_token")}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}

export function getCurrentUser(){
    const url = `${BASE_URL}/authors/${localStorage.getItem("authorID")}/`
    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
            Authorization: `JWT ${localStorage.getItem("access_token")}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}


export function editUser(object){
    const url = `${BASE_URL}/authors/${localStorage.getItem("authorID")}/`

    return axios.patch(url, object,{
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
            Authorization: `JWT ${localStorage.getItem("access_token")}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function getUser(id){
    const url = `${BASE_URL}/authors/${id}/`
    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
            Authorization: `JWT ${localStorage.getItem("access_token")}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}
