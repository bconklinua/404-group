import axios from 'axios'

export function getFollowers(){
    const url = `http://${window.location.hostname}:8000/followers/` // has to be userID

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

export function getFollowings(){
    const url = `http://${window.location.hostname}:8000/following/` // has to be userID

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


export function getFriendRequests(){
    const url = `http://${window.location.hostname}:8000/friendrequest/` // has to be userID

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

export function getFriends(){
    const url = `http://${window.location.hostname}:8000/truefriends/`

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

export function acceptFollower(id){
    console.log(localStorage.getItem("access_token"))
    const url = `http://${window.location.hostname}:8000/friendrequest/accept/${id}/`

    return axios.post(url, {data:{}}, {
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

export function rejectFollower(id){
    const url = `http://${window.location.hostname}:8000/friendrequest/reject/${id}/`
    
    return axios.post(url, {data:{}}, {
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

export function unFollow(id){
    const url = `http://${window.location.hostname}:8000/unfollow/${id}/`
    
    return axios.post(url, {data:{}}, {
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
export function unFriend(id){
    const url = `http://${window.location.hostname}:8000/unfriend/${id}/`
    
    return axios.post(url, {data:{}}, {
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
export function sendFriendRequest(id){
    const url = `http://${window.location.hostname}:8000/friendrequest/${id}/`
    
    return axios.post(url, {data:{}}, {
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