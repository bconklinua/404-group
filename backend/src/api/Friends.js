import axios from 'axios';
import { BASE_URL } from './api';

export function getFollowers(){
    const url = `${BASE_URL}/followers/` // has to be userID

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

export function getFollowings(){
    const url = `${BASE_URL}/following/` // has to be userID

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


export function getFriendRequests(){
    const url = `${BASE_URL}/friendrequest/` // has to be userID

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

export function getFriends(){
    const url = `${BASE_URL}/truefriends/`

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

export function acceptFollower(id){
    console.log(localStorage.getItem("access_token"))
    const url = `${BASE_URL}/friendrequest/accept/${id}/`

    return axios.post(url, {data:{}}, {
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

export function rejectFollower(id){
    const url = `${BASE_URL}/friendrequest/reject/${id}/`
    
    return axios.post(url, {data:{}}, {
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

export function unFollow(id){
    const url = `${BASE_URL}/unfollow/${id}/`
    
    return axios.post(url, {data:{}}, {
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
export function unFriend(id){
    const url = `${BASE_URL}/unfriend/${id}/`
    
    return axios.post(url, {data:{}}, {
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
export function sendFriendRequest(id){
    const url = `${BASE_URL}/friendrequest/${id}/`
    
    return axios.post(url, {data:{}}, {
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

export function sendRemoteFriendRequest(network_id, rec_username, rec_uuid){
    // rec_uuid = '043b97bf-3190-47c0-a253-a1775ce58184'
    // rec_username = 'jonny21099'
    const url = `${BASE_URL}/friendrequest/to_external/${network_id}/${localStorage.getItem('authorID')}/send/${rec_username}/${rec_uuid}/`
    return axios.post(url, {data:{}}, {
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