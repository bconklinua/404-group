import axios from 'axios'
import { BASE_URL } from './api';

export function getInbox(){
    const url = `${BASE_URL}/authors/${localStorage.getItem("authorID")}/inbox/` // has to be userID


    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
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
            "Access-Control-Allow-Origin":"*",
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
    const url = `${BASE_URL}/authors/${user_id}/posts/`

    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
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
            "Access-Control-Allow-Origin":"*",
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


export function postPost(post){
    const url = `${BASE_URL}/posts/`

    let form_data = new FormData();

    form_data.append("title", post.title)
    form_data.append("description", post.description)
    form_data.append("content", post.content)
    form_data.append("visibility", post.visibility)
    form_data.append("unlisted", post.unlisted)
    form_data.append("image_url", post.image_url)
    form_data.append("contentType", post.contentType)
    if (post.original_author){
        form_data.append("original_author", post.original_author)
    }
    if (post.original_author_id){
        form_data.append("original_author_id", post.original_author_id)
    }
    if (post.original_author_host){
        form_data.append("original_author_host", post.original_author_host)
    }

    return axios.post(url, form_data, {
        headers:{
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin":"*",
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
            "Access-Control-Allow-Origin":"*",
            Authorization: `JWT ${localStorage.getItem("access_token")}`
            // authorization?
        }
    }).then((response) =>{
        return response;
    }).catch((error)=>{
        
        return error.response;
    })
}

export function editPost(post){
    const url = `${BASE_URL}/authors/${localStorage.getItem("authorID")}/posts/${post.post_id}/`

    let form_data = new FormData();

    form_data.append("title", post.title)
    form_data.append("description", post.description)
    form_data.append("content", post.content)
    form_data.append("visibility", post.visibility)
    form_data.append("unlisted", post.unlisted)

    return axios.put(url, form_data, {
        headers:{
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin":"*",
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
            "Access-Control-Allow-Origin":"*",
            Authorization: `JWT ${localStorage.getItem("access_token")}`
        }
    }).then((response) =>{
        return response;
    }).catch((error)=>{
        
        return error.response;
    })
}
