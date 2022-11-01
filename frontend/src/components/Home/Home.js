import React, {useState, useEffect} from 'react'
import { test, getInbox, getPost } from '../../api/Post';
import { refreshToken, isAuthenticated } from '../../api/User';
import { useNavigate } from "react-router-dom";
import PostCard from "../Post/PostCard";

const MyPosts = () => {
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

    let content = null;

    if (posts.data){
        if (posts.data.length === 0){
            content = (<div className="none">No Posts</div>)
        }
        else{
            console.log(posts.data)
            content = posts.data[0].items.slice().reverse().map((post, key)=>
            
            <PostCard post={post}/>

            )
        }
    }

    return (
        <div>
            {content}
        </div>
    )
}
export default MyPosts;