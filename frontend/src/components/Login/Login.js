import React from 'react'
import { NavLink } from "react-router-dom";
import "./Login.css"
import { authenticate } from '../../api/Author';

const Login = () => {

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target)
        const json = Object.fromEntries(data.entries())
        authenticate(json)
        //console.log(Object.fromEntries(data.entries()))
        //window.location.href="/home"
    }
    return (
    
    <main className='page'>
        <form onSubmit={handleSubmit}>
        <div className="box">
            <h1>Login</h1>
            
            <input type="text" placeholder="username" name='username'/>
            <input type="password" placeholder="password" name='password'/>

            <button className="login-button" onSubmit={handleSubmit}>Login</button>
            <NavLink className="register-button" to="/register">Register</NavLink>
        </div>
        </form>
    </main>

    

  )
}

export default Login