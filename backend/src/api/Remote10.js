import axios from 'axios'
export function Team10GetAuthors(){
    const url = 'https://socioecon.herokuapp.com/authors/'
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