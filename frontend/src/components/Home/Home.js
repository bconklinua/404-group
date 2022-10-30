import React, {useState, useEffect} from 'react'
import { test, getInbox, getPost } from '../../api/Post';
import { refreshToken, isAuthenticated } from '../../api/User';
import { useNavigate } from "react-router-dom";

const Home = () =>{
    let navigate = useNavigate(); 
    const [post, setPost] = useState({
        loading: false,
        data: null,
        error: false,
    })
    const [login, setLogin] = useState({
        authenticated: true
    })
    // useEffect(()=>{
    //     setPost({
    //         loading: true,
    //         data: null,
    //         error: false,
    //     })
    //     // Use axios.get
    // }) 
    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target)
        const json = Object.fromEntries(data.entries())
        test().then((response) =>{
            if (response.status === 401){
                // if token expired
                refreshToken().then((response)=>{
                    console.log("success")
                }).catch((error)=>{
                    console.log(error)
                })

            }else{
                console.log(response)
            }
            console.log(response.status)
        })
        //console.log(Object.fromEntries(data.entries()))
        //window.location.href="/home"
    }

    test().then((response) =>{
        if (response.status === 401){
            // if token expired
            refreshToken().then((response)=>{
                console.log("success")
            }).catch((error)=>{
                console.log(error)
            })

        }else{
            console.log(response)
        }
        console.log(response.status)
    })

    const goLogin = (e) =>{
        let path = '/login'; 

        navigate(path);
    }
    const goRegister = (e) =>{
        let path = '/register';
        navigate(path);
    }

    let content = login.authenticated ? (        
    <main className='page'>
    <form onSubmit={handleSubmit}>
    <div>
        <h1>Home</h1>
        


        <button  onSubmit={handleSubmit}>test</button>

    </div>
    </form>
    </main>) : (
        <main>
            <h1>Please login or register</h1>
            <button color="primary" onClick={goLogin}>login</button>
            <button color="primary" onClick={goRegister}>Register</button>
        </main>

    )

    return (content)
}

export default Home