import axios from 'axios'

export function Team19Users(){
    const url = 'https://social-distribution-404.herokuapp.com/authors'
    return axios.get(url, {        
        auth: {
            username: 'team12',
            password: '96%fmA54'
        },
        headers:{
            "Content-Type": "application/json",

        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}

export function Team19SendRequest(foreign_author_id){
    const url = `https://social-distribution-404.herokuapp.com/authors/${foreign_author_id}/inbox`
    const body = {
        type: "follow",
        summary: `${localStorage.getItem('username')} wants to follow author you`,
        actor: {
            type: "author",
            id: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
            displayName: localStorage.getItem('username'),
            url: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
            host: "https://true-friends-404.herokuapp.com/",
        }
    }
    return axios.post(url, body, {
        auth: {
            username: 'team12',
            password: '96%fmA54'
        },
        headers:{
            "Content-Type": "application/json",
        }

    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team19GetPosts(foreign_author_id){
    const url = `https://social-distribution-404.herokuapp.com/authors/${foreign_author_id}/posts`
    return axios.get(url, {        
        auth: {
            username: 'team12',
            password: '96%fmA54'
        },
        headers:{
            "Content-Type": "application/json",

        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}

export function Team19GetPost(foreign_author_id, post_id){
    const url = `https://social-distribution-404.herokuapp.com/authors/${foreign_author_id}/posts/${post_id}`
    return axios.get(url, {        
        auth: {
            username: 'team12',
            password: '96%fmA54'
        },
        headers:{
            "Content-Type": "application/json",

        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}

export function Team19GetComments(foreign_author_id, post_id){
    const url = `https://social-distribution-404.herokuapp.com/authors/${foreign_author_id}/posts/${post_id}/comments`
    return axios.get(url, {        
        auth: {
            username: 'team12',
            password: '96%fmA54'
        },
        headers:{
            "Content-Type": "application/json",

        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}

export function Team19PostPost(post, remoteID){
    const url = `https://social-distribution-404.herokuapp.com/authors/${remoteID}/inbox/posts`

    var contentType = post.contentType
    var content = post.content
    if (post.image_url){
        content = post.image_url

        var type = post.image_url.split(',')[0].split(':')[1]
    }
    const body = {
        type: "post",
        id: post.id,
        source: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
        origin: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
        contentType: contentType,
        content: content,
        author: {
            type: "author",
            id: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
            displayName: localStorage.getItem('username'),
            url: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
            host: "https://true-friends-404.herokuapp.com/",
        },
        categories: JSON.stringify([]),
        visibility: post.visibility,
        unlisted: post.unlisted,
        title: post.title,
    }
    return axios.post(url, body, {
        auth: {
            username: 'team12',
            password: '96%fmA54'
        },
        headers:{
            "Content-Type": "application/json",
        }

    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

export function Team19GetUser(foreign_author_id){
    const url = `https://social-distribution-404.herokuapp.com/authors/${foreign_author_id}`
    return axios.get(url, {        
        auth: {
            username: 'team12',
            password: '96%fmA54'
        },
        headers:{
            "Content-Type": "application/json",

        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}


export function Team19Like(summary, object, foreign_author_id){
    const url = `https://social-distribution-404.herokuapp.com/authors/${foreign_author_id}/inbox/likes`

    const body = {
        context: 'http://todo.com/',
        summary: summary,
        type: 'like',
        author: {
            type: "author",
            id: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
            displayName: localStorage.getItem('username'),
            url: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
            host: "https://true-friends-404.herokuapp.com/",
        },
        object: object
    }   

    return axios.post(url, body, {        
        auth: {
            username: 'team12',
            password: '96%fmA54'
        },
        headers:{
            "Content-Type": "application/json",

        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}

export function Team19Comment(comment, foreign_author_id, post_id){
    const url = `https://social-distribution-404.herokuapp.com/authors/${foreign_author_id}/inbox/comments`

    const body = {
        comment: comment.comment,
        post: post_id,
        published: comment.published,
        contentType: 'text/plain',
        author: {
            type: "author",
            id: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
            displayName: localStorage.getItem('username'),
            url: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
            host: "https://true-friends-404.herokuapp.com/",
        },
    }
    return axios.post(url, body, {        
        auth: {
            username: 'team12',
            password: '96%fmA54'
        },
        headers:{
            "Content-Type": "application/json",

        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}

// export function Team19DeletePost(post_id){
//     const url = `https://social-distribution-404.herokuapp.com/authors/${localStorage.getItem('authorID')}/posts/${post_id}`
//     return axios.delete(url, {        
//         auth: {
//             username: 'team12',
//             password: '96%fmA54'
//         },
//         headers:{
//             "Content-Type": "application/json",

//         }
//     }).then((response)=>{
//         return response
//     }).catch((error)=>{
//         return error
//     })
// }

// export function Team19EditPost(post){
//     const url = `https://social-distribution-404.herokuapp.com/authors/${localStorage.getItem("authorID")}/posts/${post.post_id}`
//     var contentType = post.contentType
//     var content = post.content
//     if (json.image_url){
//         content = post.image_url

//         type = post.image_url.split(',')[0].split(':')[1]
//     }
//     const body = {
//         //type: "post",
//         id: post.id,
//         source: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
//         origin: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
//         contentType: contentType,
//         content: content,
//         // author: {
//         //     type: "author",
//         //     id: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
//         //     displayName: localStorage.getItem('username'),
//         //     url: `https://true-friends-404.herokuapp.com/authors/${localStorage.getItem('authorID')}`,
//         //     host: "https://true-friends-404.herokuapp.com/",
//         // },
//         categories: JSON.stringify([]),
//         visibility: post.visibility,
//         unlisted: post.unlisted,
//         title: post.title,
//     }
//     return axios.put(url, body, {
//         auth: {
//             username: 'team12',
//             password: '96%fmA54'
//         },
//         headers:{
//             "Content-Type": "application/json",
//         }

//     }).then((response)=>{
//         return response
//     }).catch((error)=>{
//         return error
//     }) 
// }