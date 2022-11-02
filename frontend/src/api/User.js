import axios from 'axios'

export function authenticate(param = {}){
    const url = 'http://localhost:8000/api/auth/login/'
    const body = {
        email: param.email,
        password: param.password,
        
    }
    console.log(param)

    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
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
    const url = 'http://localhost:8000/api/auth/register/'
    const body = {
        email: param.email,
        username: param.username,
        password: param.password,
    }
    console.log(param)
    return axios.post(url, body, {
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) =>{
        return response;
    }).catch((error)=>{
        return error.response;
    })
}

export function getToken(param = {}){
    // Gets a token
    const url = 'http://localhost:8000/api/token/obtain/'
    const body = {
        email: param.email,
        password: param.password,
        
    }
    console.log(param)

    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
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
    const url = 'http://127.0.0.1:8000/api/token/refresh/'
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
    const url = 'http://127.0.0.1:8000/authors/'
    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access_token")}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}