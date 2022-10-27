import React, {useState, useEffect} from 'react'
import { test } from '../../api/Post';
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
        test(json).then((response) =>{
            if (response.status === 400){
                console.log("400")
            }
            else if (response.status === 202){
                console.log(response.headers.get('set-cookies'))
                console.log(document.cookie)
                localStorage.setItem("token", document.cookie)

            }
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