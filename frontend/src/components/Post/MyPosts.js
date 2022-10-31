import react, { useEffect, useState } from 'react'
import { getFriends } from '../../api/Friends'
import { refreshToken } from '../../api/User'
import PostCard from './PostCard'
import { getPosts } from '../../api/Post'

const MyPosts = () => {
    const [posts, setPosts] = useState({
        data: null,
    })
    useEffect(()=>{
        setPosts({
            data: null,
        })
        getPosts().then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("success")
                        console.log(response.status)
                        getPosts().then((response)=>{
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
    console.log(posts.data)
    if (posts.data){
        if (posts.data.length === 0){
            content = (<div className="none">No Postss</div>)
        }
        else{
            content = posts.data.map((post, key)=>

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