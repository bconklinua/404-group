import axios from 'axios'

export function Team13Users(){
    const url = 'https://cmput404-team13.herokuapp.com/authors?page=1&size=1000000'
    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}