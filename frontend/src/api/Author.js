import axios from 'axios'

export function authenticate(param = {}){
    const url = 'http://localhost:8000'
    const body = {
        username: param.username,
        passwword: param.password,
        
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

