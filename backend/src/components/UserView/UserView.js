import react, { useState, useEffect } from 'react'

import {Box, Divider, Tab} from '@mui/material'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import { useParams } from 'react-router-dom'
import { refreshToken } from '../../api/User'
import { getUserPost } from '../../api/Post'
import PostCard from '../Post/PostCard'

const UserView = () =>{

    const {user_id, username} = useParams();
    const [userPost, setUserPost] = useState({
        data: null,
    })
    useEffect(()=>{
        setUserPost({
            data: null,
        })
        getUserPost(user_id).then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("refresh token")
                        console.log(response.status)
                        getUserPost(user_id).then((response)=>{
                            if (response.status === 200){
                                setUserPost({
                                    data: response.data,
                                })
                            }
                            else{
                                console.log("not authenticated")
                                localStorage.removeItem("refresh_token")
                                window.location.reload();
                                window.location.href = '/login'; 
                            }

                        })
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                        
                    }
                })
            }else if (response.status === 200){
                setUserPost({
                    data: response.data,
                })
            }
        })
    }, [])
    let content = null;
    console.log(userPost.data)
    if (userPost.data){
        if (userPost.data.length === 0){
            content = (<div className="none">No Posts</div>)
        }
        else{
            content = userPost.data.slice().reverse().map((post, key)=>

            <PostCard post={post}/>

            )
        }
    }
    return (
        <main>
            <h1 className='profileName'>{username}</h1>

            <Divider/>
            {content}
        </main>
    )

}
export default UserView