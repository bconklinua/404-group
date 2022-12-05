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

export function Team10FriendRequest(foreign_author_id){
    const url = `https://socioecon.herokuapp.com/authors/${foreign_author_id}/followers/`
    const body = {
        "actor": `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}/`
    }
    return axios.post(url, body, {
        headers: { 
            'Authorization': 'Basic dGVhbTEyOnRlYW0xMg==', // base64 encoded team12:team12 basic auth for your convenience; maybe just use this token
            'Content-Type': 'application/json'
          },
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}

export function Team10GetPosts(foreign_author_id){
    const url = `https://socioecon.herokuapp.com/authors/${foreign_author_id}/posts/`
    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            'Authorization': 'Basic dGVhbTEyOnRlYW0xMg==',
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}