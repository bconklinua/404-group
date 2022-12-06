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


export function Team10PostPost(json, foreign_author_id){
    const url = `https://socioecon.herokuapp.com/authors/${foreign_author_id}/inbox`
    var content = json.content
    var contentType = json.contentType
    var authorID = localStorage.getItem('authorID')
    if (json.image_url){
        content = json.image_url

        contentType = json.image_url.split(',')[0].split(':')[1]
    }
    const body = {
        type: "post",
        //"actor": `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}/`,
        title: json.title,
        source: 'https://true-friends-404.herokuapp.com/',
        origin: 'https://true-friends-404.herokuapp.com/',
        description: json.description,
        contentType: contentType,
        content: content,
        visibility: json.visibility,
        published: json.published,
        author: {
            type: 'author',
            id: authorID,
            displayName: localStorage.getItem('username'),
            host: 'https://true-friends-404.herokuapp.com',
            url: `https://true-friends-404.herokuapp.com/authors/${authorID}`,
            github: '',
            profileImage: '',

        },
        // originalAuthor: {
        //     id: localStorage.getItem('authorID'),
        //     displayName: localStorage.getItem('username'),
        //     host: 'https://true-friends-404.herokuapp.com',
        // },
        count: 0,
        id: json.id,
        comments: "[]",
        url: `https://true-friends-404.herokuapp.com/authors/${authorID}/posts/${json.id}`
    }
    console.log(body)
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

export function Team10Comment(){
    
}