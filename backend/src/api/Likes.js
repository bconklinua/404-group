import axios from "axios";

export function doLike(id){
    const url = `http://${window.location.hostname}:8000/posts/${id}/likes/`
    
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