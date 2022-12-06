import axios from 'axios'
import { Team13Token } from './api'

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

export function Team13JWT(){
    const url = 'https://cmput404-team13.herokuapp.com/users'
    const body = {
        username: 'team12',
        password: 'securepassword'
    }
    return axios.put(url, body, {
        
        headers:{
            "Content-Type": "application/json",

        }
    }).then((response)=>{
        console.log(response.data)
        return response
    }).catch((error)=>{
        return error
    })
}

export function Team13SendRequest(foreign_author_id){
    const url = `https://cmput404-team13.herokuapp.com/authors/${localStorage.getItem('authorID')}/followers/${foreign_author_id}`
    const body = {
        author:{
            id: `${localStorage.getItem('authorID')}`,
            displayName: `${localStorage.getItem('username')}`,
            host: 'https://true-friends-404.herokuapp.com',
        }
    }
    console.log(url)
    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team13AcceptRequest(foreign_author_id){
    const url = `https://cmput404-team13.herokuapp.com/authors/${localStorage.getItem('authorID')}/followers/${foreign_author_id}`

    return axios.put(url, {}, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team13RejectRequest(foreign_author_id){
    const url = `https://cmput404-team13.herokuapp.com/authors/${localStorage.getItem('authorID')}/followRequest/${foreign_author_id}`

    return axios.delete(url, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team13Unfollow(foreign_author_id){
    const url = `https://cmput404-team13.herokuapp.com/authors/${localStorage.getItem('authorID')}/followers/${foreign_author_id}`

    return axios.delete(url, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team13GetPosts(foreign_author_id){
    const url = `https://cmput404-team13.herokuapp.com/authors/${foreign_author_id}/posts`

    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team13GetPost(foreign_author_id, post_id){
    const url = `https://cmput404-team13.herokuapp.com/authors/${foreign_author_id}/posts/${post_id}`

    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team13GetComments(foreign_author_id, post_id){
    const url = `https://cmput404-team13.herokuapp.com/authors/${foreign_author_id}/posts/${post_id}/comments`

    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team13PostPost(post_id, json){
    const url = `https://cmput404-team13.herokuapp.com/authors/${localStorage.getItem('authorID')}/posts`
    var content = json.content
    var contentType = json.contentType
    if (json.image_url){
        content = json.image_url
        contentType = 'image'
    }
    var originalAuthor = {
        id: localStorage.getItem('authorID'),
        displayName: localStorage.getItem('username'),
        host: 'https://true-friends-404.herokuapp.com',
    }
    if (json.originalAuthor){
        originalAuthor = json.originalAuthor
    }
    const body = {
        type: "post",
        title: json.title,
        source: 'https://true-friends-404.herokuapp.com/',
        origin: 'https://true-friends-404.herokuapp.com/',
        description: json.description,
        contentType: contentType,
        content: content,
        visibility: json.visibility,
        published: json.published,
        author: {
            id: localStorage.getItem('authorID'),
            displayName: localStorage.getItem('username'),
            host: 'https://true-friends-404.herokuapp.com',
        },
        originalAuthor: originalAuthor,
        id: post_id
    }
    console.log(body)
    return axios.put(url, body, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })  
}

export function Team13SendInbox(post_id, visibility){
    var url = `https://cmput404-team13.herokuapp.com/inbox/public/${localStorage.getItem('authorID')}/${post_id}`
    if (visibility === 'FRIENDS'){
        url = `https://cmput404-team13.herokuapp.com/inbox/friend/${localStorage.getItem('authorID')}/${post_id}`
    }
    const body = {}
    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })  
}

export function Team13DeletePost(post_id){
    const url = `https://cmput404-team13.herokuapp.com/authors/${localStorage.getItem('authorID')}/posts/${post_id}`

    return axios.delete(url, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team13AddLike(author_id, post_id){
    const url = `https://cmput404-team13.herokuapp.com/authors/${author_id}/posts/${post_id}/likes/${localStorage.getItem('authorID')}`

    const body = {
        author: {
            id: localStorage.getItem('authorID'),
            displayName: localStorage.getItem('username'),
            host: 'https://true-friends-404.herokuapp.com',
        }
    }

    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team13DeleteLike(author_id, post_id){
    const url = `https://cmput404-team13.herokuapp.com/authors/${author_id}/posts/${post_id}/likes/${localStorage.getItem('authorID')}`

    return axios.delete(url, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team13EditPost(json){
    const url = `https://cmput404-team13.herokuapp.com/authors/${localStorage.getItem('authorID')}/posts/${json.post_id}`
    var content = json.content
    var contentType = json.contentType
    if (json.image_url){
        content = json.image_url
        contentType = 'image'
    }
    const body = {
        type: "post",
        title: json.title,
        source: 'https://true-friends-404.herokuapp.com/',
        origin: 'https://true-friends-404.herokuapp.com/',
        description: json.description,
        contentType: contentType,
        content: content,
        visibility: json.visibility,
        published: json.published,
        author: {
            id: localStorage.getItem('authorID'),
            displayName: localStorage.getItem('username'),
            host: 'https://true-friends-404.herokuapp.com',
        },
        originalAuthor: {
            id: localStorage.getItem('authorID'),
            displayName: localStorage.getItem('username'),
            host: 'https://true-friends-404.herokuapp.com',
        },
        id: json.post_id
    }
    console.log(body)
    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })  
}

export function Team13PostComment(comment, id, post_id){
    const url = `https://cmput404-team13.herokuapp.com/authors/${localStorage.getItem('authorID')}/posts/${post_id}/comments`
    var body = {
        comment: comment.comment,
        author: {
            id: localStorage.getItem('authorID'),
            displayName: localStorage.getItem('username'),
            host: 'https://true-friends-404.herokuapp.com',
        },
    }
    if (id != ""){
        body["id"] = id
    }


    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team13GetUser(foreign_author_id){
    const url = `https://cmput404-team13.herokuapp.com/authors/${foreign_author_id}`

    return axios.get(url, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })     
}


export function Team13CheckLiked(comments){
    const url = `https://cmput404-team13.herokuapp.com/authors/${comments.post.author.id}/posts/${comments.post.id}/comments/${comments.id}/liked/${localStorage.getItem('authorID')}`
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

export function Team13LikeComment(comments){
    const url = `https://cmput404-team13.herokuapp.com/authors/${comments.post.author.id}/posts/${comments.post.id}/comments/${comments.id}/likes/${localStorage.getItem('authorID')}`

    const body = {
        author: {
            id: localStorage.getItem('authorID'),
            displayName: localStorage.getItem('username'),
            host: 'https://true-friends-404.herokuapp.com',
        }
    }

    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team13DeleteLikeComment(comments){
    const url = `https://cmput404-team13.herokuapp.com/authors/${comments.post.author.id}/posts/${comments.post.id}/comments/${comments.id}/likes/${localStorage.getItem('authorID')}`

    return axios.delete(url, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Team13Token}`
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}