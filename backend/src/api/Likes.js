import axios from "axios";

export function doLike(id){
    const url = `${BASE_URL}/posts/${id}/likes/`
    
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