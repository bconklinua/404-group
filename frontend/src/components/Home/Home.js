import React, {useState, useEffect} from 'react'
import { test, getInbox, getPost } from '../../api/Post';
import { refreshToken } from '../../api/User';
import { NavLink } from "react-router-dom";

const Home = () =>{
    const [post, setPost] = useState({
        loading: false,
        data: null,
        error: false,
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
        getInbox(json).then((response) =>{
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

    return (
        <main className='page'>
        <form onSubmit={handleSubmit}>
        <div>
            <h1>Home</h1>
            


            <button  onSubmit={handleSubmit}>test</button>

        </div>
        </form>
    </main>
    )
}

export default Home