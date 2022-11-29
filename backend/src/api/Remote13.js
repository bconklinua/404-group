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
        }
    }
    console.log(url)
    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNzU2NzE2ZGRmMjRkZmY4ZmNjMmI4ZDE3ZjM2YmE1IiwiZXhwIjoxNzAwOTgzNzUyLCJpYXQiOjE2Njk0NDc3NTJ9.yHOu-uXtvY7U7HKfCGBxXYCnFDR53I1Wlju7h40bhyo"
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
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNzU2NzE2ZGRmMjRkZmY4ZmNjMmI4ZDE3ZjM2YmE1IiwiZXhwIjoxNzAwOTgzNzUyLCJpYXQiOjE2Njk0NDc3NTJ9.yHOu-uXtvY7U7HKfCGBxXYCnFDR53I1Wlju7h40bhyo"
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
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNzU2NzE2ZGRmMjRkZmY4ZmNjMmI4ZDE3ZjM2YmE1IiwiZXhwIjoxNzAwOTgzNzUyLCJpYXQiOjE2Njk0NDc3NTJ9.yHOu-uXtvY7U7HKfCGBxXYCnFDR53I1Wlju7h40bhyo"
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
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNzU2NzE2ZGRmMjRkZmY4ZmNjMmI4ZDE3ZjM2YmE1IiwiZXhwIjoxNzAwOTgzNzUyLCJpYXQiOjE2Njk0NDc3NTJ9.yHOu-uXtvY7U7HKfCGBxXYCnFDR53I1Wlju7h40bhyo"
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
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNzU2NzE2ZGRmMjRkZmY4ZmNjMmI4ZDE3ZjM2YmE1IiwiZXhwIjoxNzAwOTgzNzUyLCJpYXQiOjE2Njk0NDc3NTJ9.yHOu-uXtvY7U7HKfCGBxXYCnFDR53I1Wlju7h40bhyo"
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
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNzU2NzE2ZGRmMjRkZmY4ZmNjMmI4ZDE3ZjM2YmE1IiwiZXhwIjoxNzAwOTgzNzUyLCJpYXQiOjE2Njk0NDc3NTJ9.yHOu-uXtvY7U7HKfCGBxXYCnFDR53I1Wlju7h40bhyo"
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
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNzU2NzE2ZGRmMjRkZmY4ZmNjMmI4ZDE3ZjM2YmE1IiwiZXhwIjoxNzAwOTgzNzUyLCJpYXQiOjE2Njk0NDc3NTJ9.yHOu-uXtvY7U7HKfCGBxXYCnFDR53I1Wlju7h40bhyo"
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
    var contentType = 'text/plain'
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
            displayName: localStorage.getItem('username')
        },
        originalAuthor: {
            id: localStorage.getItem('authorID'),
            displayName: localStorage.getItem('username')
        },
        id: post_id
    }
    console.log(body)
    return axios.put(url, body, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNzU2NzE2ZGRmMjRkZmY4ZmNjMmI4ZDE3ZjM2YmE1IiwiZXhwIjoxNzAwOTgzNzUyLCJpYXQiOjE2Njk0NDc3NTJ9.yHOu-uXtvY7U7HKfCGBxXYCnFDR53I1Wlju7h40bhyo"
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })  
}

export function Team13SendInbox(post_id, visibility){
    const url = `https://cmput404-team13.herokuapp.com/inbox/public/${localStorage.getItem('authorID')}/${post_id}`
    if (visibility === 'FRIENDS'){
        url = `https://cmput404-team13.herokuapp.com/inbox/friend/${localStorage.getItem('authorID')}/${post_id}`
    }
    const body = {}
    return axios.post_id(url, body, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNzU2NzE2ZGRmMjRkZmY4ZmNjMmI4ZDE3ZjM2YmE1IiwiZXhwIjoxNzAwOTgzNzUyLCJpYXQiOjE2Njk0NDc3NTJ9.yHOu-uXtvY7U7HKfCGBxXYCnFDR53I1Wlju7h40bhyo"
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
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNzU2NzE2ZGRmMjRkZmY4ZmNjMmI4ZDE3ZjM2YmE1IiwiZXhwIjoxNzAwOTgzNzUyLCJpYXQiOjE2Njk0NDc3NTJ9.yHOu-uXtvY7U7HKfCGBxXYCnFDR53I1Wlju7h40bhyo"
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}