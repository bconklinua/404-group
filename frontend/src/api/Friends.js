import axios from 'axios'

export function getFollowers(){
    const url = `http://localhost:8000/followers/` // has to be userID

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
    const url = `http://localhost:8000/friendrequest/` // has to be userID

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