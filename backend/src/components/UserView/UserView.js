import react, { useState, useEffect } from 'react'

//import {Box, Divider, Tab} from '@mui/material'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import { useParams } from 'react-router-dom'
import { refreshToken } from '../../api/User'
import { getUserPost } from '../../api/Post'
import PostCard from '../Post/PostCard'
import { Team13GetPosts } from '../../api/Remote13'
import { Team19GetPosts } from '../../api/Remote19'
import ProfileCardView from './ProfileCardView'
import { Divider, CircularProgress, Box } from '@mui/material'
import { Team10GetPosts } from '../../api/Remote10'

const UserView = () =>{
    
    const {user_id, username, team} = useParams();
    const [userPost, setUserPost] = useState({
        data: null,
    })
    console.log(username)
    useEffect(()=>{
        setUserPost({
            data: null,
        })
        if (team === '12'){
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
        }
        else if (team === '13'){
            Team13GetPosts(user_id).then((response)=>{
                console.log(response)
                if (response.status === 200){
                    setUserPost({data: response.data.posts})
                }
                
            })
        }else if (team === '19'){
            Team19GetPosts(user_id).then((response)=>{
                console.log(response)
                if (response.status === 200){
                    setUserPost({data: response.data.items})
                }
                console.log(response.data.items)
            })
        }else if (team === '10'){
            Team10GetPosts(user_id).then((response)=>{
                console.log("team 10 user posts")
                console.log(response)
                if (response.status === 200){
                    setUserPost({data: response.data.items})
                }
            })
        }

    }, [])
    let content = ( <Box display="flex" justifyContent="center" alignItems="center" sx={{ display: 'flex', color: 'grey.500' }}>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <CircularProgress size="7rem" color="inherit"/>
                </Box>)

    console.log(userPost.data)
    if (userPost.data){
        if (userPost.data.length === 0){
            content = (<div className="none">No Posts</div>)
        }
        else{
            content = userPost.data.slice().reverse().filter((item)=>{
                return !item.visibility.toLowerCase().includes('friends')
            }).filter((item)=>{
                return item.unlisted !== true
            }).map((post, key)=>

            <PostCard post={post}/>

            )
        }
    }
    return (
        <main>
            <ProfileCardView/>
            <Divider/>
            <br/>
            {content}
        </main>
    )

}
export default UserView