import axios from 'axios'

export function getInbox(){
    const url = 'http://localhost:8000/api/auth/login/' // has to be userID



    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            // authorization?
        }
    }).then((response) =>{
        return response;
    }).catch((error)=>{
        return error.response;
    })
}

export function test(param = {}){
    const url = 'http://localhost:8000/api/auth/test/' // has to be userID

    console.log(param)

    return axios.get(url, {
        headers:{
            withCredentials: true,
            "Content-Type": "application/json",
            // authorization?
        }
    }).then((response) =>{
        return response;
    }).catch((error)=>{
        return error.response;
    })
}