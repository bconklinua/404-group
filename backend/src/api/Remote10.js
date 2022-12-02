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

export function Team10GetAuthor(foreign_author_id){
    const url = `https://socioecon.herokuapp.com/authors/${foreign_author_id}/`
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