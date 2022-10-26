import React from 'react'
import { NavLink } from "react-router-dom";

import "./Register.css"

const Register = () => {

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target)
        console.log(Object.fromEntries(data.entries()))
    
    }
    return (
    // div styling taken from stackoverflow, can adjust later
    
    <main className='page'>
        <form onSubmit={handleSubmit}>
        <div className="box">
            <h1>Register</h1>
            
            <input type="text" placeholder="username" name='username'/>
            <input type="password" placeholder="password" name='password'/>
            <input type="password" placeholder="confirm password" name='confirm password'/>

            <button className="register-button1" onSubmit={handleSubmit}>Register</button>
            <NavLink className="login-button1" to="/login">Login</NavLink>
        </div>
        </form>
    </main>

    

  )
}

export default Register