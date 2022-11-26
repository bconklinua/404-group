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
            "Access-Control-Allow-Origin":"*",
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
            "Access-Control-Allow-Origin":"*",
        }
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    }) 
}

