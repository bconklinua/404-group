import React from 'react'
import { NavLink } from "react-router-dom";
import "./Login.css"
import { authenticate, test } from '../../api/User';

const Login = () => {

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target)
        const json = Object.fromEntries(data.entries())
        authenticate(json).then((response) =>{
            if (response.status === 400){
                console.log("400")
            }
            else if (response.status === 202){
                console.log(response.headers.get('set-cookies'))
                console.log(document.cookie)
                localStorage.setItem("token", document.cookie)
                window.location.href="/home"
            }
        })
        //console.log(Object.fromEntries(data.entries()))
        //window.location.href="/home"
    }
    return (
    
    <main className='page'>
        <form onSubmit={handleSubmit}>
        <div className="box">
            <h1>Login</h1>
            
            <input type="email" placeholder="email" name='email'/>
            <input type="password" placeholder="password" name='password'/>

            <button className="login-button" onSubmit={handleSubmit}>Login</button>
            <NavLink className="register-button" to="/register">Register</NavLink>
        </div>
        </form>
    </main>

    

  )
}

export default Login