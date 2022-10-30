import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css"
import { authenticate, getToken } from '../../api/User';

const Login = () => {
    let navigate = useNavigate(); 
    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target)
        const json = Object.fromEntries(data.entries())
        authenticate(json).then((response) =>{
            if (response.status === 202){
                // if authentication is true
                getToken(json).then((response)=>{
                    if (response.status === 200){
                        console.log(response)
                        window.location.reload();
                        navigate('/')
                    }else console.log(response.status);
                })

            }else console.log(response.status);
        })
        //console.log(Object.fromEntries(data.entries()))
        //
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