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