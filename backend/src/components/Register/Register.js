import React, {useState} from 'react'
import { NavLink } from "react-router-dom";
import { postUser } from '../../api/User';
import "./Register.css"


const Register = () => {

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target)
        const json = Object.fromEntries(data.entries())
        postUser(json).then((response) =>{
            if (response.status === 400){
                console.log("400")
            }
            else if (response.status === 201){
                console.log("201")
            }
        })
        // console.log(json)
        // console.log(json.username)

    
    }
    const handleInputChange = (e) => {
        const password = e.target.value
        console.log(password)
    }

    return (
    // div styling taken from stackoverflow, can adjust later
    
    <main className='page'>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/> 
        <form onSubmit={handleSubmit}>
        <div className="box">
            <h1 className="register">Register</h1>
            <input className="input" type="email" placeholder="email" name='email'/>
            <input className="input" type="text" placeholder="username" name='username'/>
            <input className="input" type="password" placeholder="password" name='password' onChange={handleInputChange}/>

            <button className="register-button1" onSubmit={handleSubmit}>Register</button>
            <NavLink className="login-button1" to="/login">Login</NavLink>
        </div>
        </form>
    </main>

    

  )
}

export default Register