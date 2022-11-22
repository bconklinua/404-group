import axios from 'axios'
import { BASE_URL } from './api'


export function getInbox(){
    const url = `${BASE_URL}/authors/${localStorage.getItem("authorID")}/inbox/` // has to be userID


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

export function test(){
    const url = `${BASE_URL}/authors/` // has to be userID


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

export function getUserPost(user_id){
    const url = `http://${window.location.hostname}/authors/${user_id}/posts/`

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

export function getPostByID(post_id) {
    const url = `${BASE_URL}/posts/${post_id}/`
    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access_token")}`
        }
    }).then((response) =>{
        // console.log("returning response");
        // console.log(response.data);
        return response;
    }).catch((error)=>{
        return error.response;
    })
}


export function postPost(param = {}){
    const url = `${BASE_URL}/posts/`

    let form_data = new FormData();
    if (param.image) form_data.append("image", param.image, param.image.name)
    form_data.append("title", param.title)
    form_data.append("description", param.description)
    form_data.append("content", param.content)
    form_data.append("visibility", param.visibility)
    form_data.append("unlisted", param.unlisted)
    form_data.append("image_url", param.image_url)

    return axios.post(url, form_data, {
        headers:{
            "Content-Type": "multipart/form-data",
            Authorization: `JWT ${localStorage.getItem("access_token")}`
        }
    }).then((response) =>{
        return response;
    }).catch((error)=>{
        
        return error.response;
    })
}

export function getPosts(){
    const url = `${BASE_URL}/currentauthor/posts/`

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

export function editPost(param = {}){
    const url = `${BASE_URL}/authors/${localStorage.getItem("authorID")}/posts/${param.post_id}/`

    let form_data = new FormData();
    if (param.image) form_data.append("image", param.image, param.image.name)
    form_data.append("title", param.title)
    form_data.append("description", param.description)
    form_data.append("content", param.content)
    form_data.append("visibility", param.visibility)
    form_data.append("unlisted", param.unlisted)

    return axios.put(url, form_data, {
        headers:{
            "Content-Type": "multipart/form-data",
            Authorization: `JWT ${localStorage.getItem("access_token")}`
        }
    }).then((response) =>{
        return response;
    }).catch((error)=>{
        
        return error.response;
    })
}

export function deletePost(post_id){
    const url = `${BASE_URL}/authors/${localStorage.getItem("authorID")}/posts/${post_id}/`

    return axios.delete(url, {
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
