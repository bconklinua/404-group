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
                    if (response === true){
                        console.log("success")
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                    }
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