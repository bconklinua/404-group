import axios from "axios";

export function getComments(post_id){
    const url = `http://localhost:8000/posts/${post_id}/comments/`

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

export function postComment(param = {}){
    const url = `http://localhost:8000/posts/${param.post_id}/comments/`

    const body = {
        comment: param.comment,
        contentType: "text/plain"
        
    }

    return axios.post(url, body, {
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