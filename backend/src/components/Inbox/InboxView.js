import React, {useState, useEffect} from 'react'
import { test, getInbox, getPost } from '../../api/Post';
import { refreshToken, isAuthenticated } from '../../api/User';
import { useNavigate } from "react-router-dom";
import LikesCard from './LikesCard';
import CommentCard from './CommentCard'
import PostCard from "./PostCard"
import { CircularProgress, Box } from '@mui/material';

const InboxView = (props) =>{
    const [posts, setPosts] = useState({
        data: null,
    })
    useEffect(()=>{
        setPosts({
            data: null,
        })
        getInbox().then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("success")
                        console.log(response.status)
                        getInbox().then((response)=>{
                            if (response.status === 200){
                                setPosts({
                                    data: response.data,
                                })
                            }
                            else{
                                localStorage.removeItem("refresh_token")
                                window.location.reload();
                                window.location.href = '/login'; 
                            }
                            console.log("true");
                        })
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                        
                    }
                })
            }else if (response.status === 200){
                console.log(response)
                setPosts({
                    data: response.data,
                })
            }
        })
    }, [])

    let content = ( <Box display="flex" justifyContent="center" alignItems="center" sx={{ display: 'flex', color: 'grey.500' }}>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <CircularProgress size="7rem" color="inherit"/>
                    </Box>)

    if (posts.data){
        if (posts.data.length === 0){
            content = (<div className="none">No Posts</div>)
        }
        else{
            console.log(posts.data)
            if (props.selection === 'posts'){
                content = posts.data[0].posts.map((post, key)=>
                
                <PostCard post={post}/>

                )
            }
            else if (props.selection === 'likes'){
                content = posts.data[0].likes.map((like, key)=>
                <LikesCard like={like}/>
                )
            }
            else if (props.selection === 'comments'){
                
                content = posts.data[0].comments.map((comment, key)=>
                <CommentCard comment={comment}/>
                )
            }
        }
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default InboxView