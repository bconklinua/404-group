import React, {useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css"
import { authenticate, getToken } from '../../api/User';
import { Alert, AlertTitle } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    let navigate = useNavigate(); 
    const notify = () => toast("Wow so easy!");
    const [alert, setAlert] = useState({
        alert: false,
        alertContent: null
    })
    const handleSubmit = (e) =>{

        e.preventDefault();
        const data = new FormData(e.target)
        const json = Object.fromEntries(data.entries())
        authenticate(json).then((response) =>{
            if (response.status === 202){
                // if authentication is true
                getToken(json).then((response)=>{
                    if (response.status === 200){
                        toast.success('Logged In!')
                        console.log(response);
                        // window.location.reload();
                        window.location.href = '/home';
                        

                    }else toast.error('something went wrong');
                })

            }else {
                toast.error('email or password incorrect')

            }console.log(response.status);
        })
        //console.log(Object.fromEntries(data.entries()))
        //
    }
    let alertContent = alert.alertContent

    return (
    

    <main className='page'>

        <form onSubmit={handleSubmit}>
        <div className="box">
            <h1>Login</h1>
            {alertContent}
            <input className="input" type="email" placeholder="email" name='email'/>
            <input className="input" type="password" placeholder="password" name='password'/>

            <button className="login-button" onSubmit={handleSubmit}>Login</button>
            <NavLink className="register-button" to="/register">Register</NavLink>
        </div>
        </form>
    </main>

    

  )
}

export default Login