import React, {useState, useEffect} from 'react'
import { test, getInbox, getPost } from '../../api/Post';
import { refreshToken, isAuthenticated } from '../../api/User';
import { NavLink, useNavigate } from "react-router-dom";

const Welcome = () =>{
    let navigate = useNavigate(); 
    const [load, setLoad] = useState({
        load: true
    })

            // if token expired
    if (!sessionStorage.reloaded){
        refreshToken().then((response)=>{
            if (response == null){
                console.log("success")
                navigate('/home');
            }
            else{
                console.log(response)
                sessionStorage.setItem("reloaded", "true")
                window.location.reload();

            }
        })
    }


    const goLogin = (e) =>{
        let path = '/login'; 
        sessionStorage.removeItem("reloaded");
        navigate(path);
    }
    const goRegister = (e) =>{
        let path = '/register';
        sessionStorage.removeItem("reloaded");
        navigate(path);
    }
    
    let content = !sessionStorage.reloaded ? (        
        <main>

        </main>

    ) : (
        <main>
                        <h1>Please login or register</h1>
            <button color="primary" onClick={goLogin}>login</button>
            <button color="primary" onClick={goRegister}>Register</button>
        </main>
    )
    return (content)
}

export default Welcome