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