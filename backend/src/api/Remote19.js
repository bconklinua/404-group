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
            "Access-Control-Allow-Origin":"*",
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
}

export function Team19SendRequest(foreign_author_id){
    const url = `https://social-distribution-404.herokuapp.com/authors/${localStorage.getItem('authorID')}/followers/${foreign_author_id}`
    const body = {
        author:{
            id: localStorage.getItem('authorID'),
            displayName: localStorage.getItem('username'),
        }
    }
    return axios.post(url, body, {
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*",
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}