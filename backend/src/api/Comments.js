import axios from "axios";
import { BASE_URL } from './api';

export function getComments(post_id){
    const url = `${BASE_URL}/posts/${post_id}/comments/`

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

export function postComment(comment){
    const url = `${BASE_URL}/posts/${comment.post_id}/comments/`

    const body = {
        comment: comment.comment,
        contentType: "text/plain"
        
    }
    if (comment.id){
        body['id'] = comment.id
    }

    return axios.post(url, body, {
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
export function likeComment(comment){
    const url = `${BASE_URL}/comments/${comment.id}/likes/`
    console.log("in the axios comment like")
    console.log(comment)
    const body = {
        author: localStorage.getItem("authorID"),
        comment: comment.id,
        post: comment.post_id,
        
    }

    return axios.post(url, body, {
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