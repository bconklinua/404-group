import axios from 'axios'


export function getInbox(){
    const url = `http://localhost:8000/authors/${localStorage.getItem("authorID")}/inbox/` // has to be userID


    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access_token")}`
        }
    }).then((response) =>{
        return response;
    }).catch((error)=>{
        return error.response;
    })
}

export function test(param = {}){
    const url = 'http://127.0.0.1:8000/authors/' // has to be userID

    console.log(param)

    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access_token")}`
            // authorization?
        }
    }).then((response) =>{
        return response;
    }).catch((error)=>{
        
        return error.response;
    })
}

export function getPost(){
    const url = 'http://127.0.0.1:8000/authors/7/posts'

    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access_token")}`
            // authorization?
        }
    }).then((response) =>{
        return response;
    }).catch((error)=>{
        
        return error.response;
    })
}