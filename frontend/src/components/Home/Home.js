import React, {useState, useEffect} from 'react'


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

    return (
        <div>
            <h1>Posts</h1>
        </div>
    )
}

export default Home