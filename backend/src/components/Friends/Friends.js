import react, { useEffect, useState } from 'react'
import { getFriends } from '../../api/Friends'
import { refreshToken } from '../../api/User'
import FriendCard from './FriendCard'
import PostCard from '../Post/PostCard'
import { getPosts } from '../../api/Post'
import { CircularProgress, Box } from '@mui/material'

const Friends = () => {
    const [friends, setFriends] = useState({
        data: null,
    })
    useEffect(()=>{
        setFriends({
            data: null,
        })
        getFriends().then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("success")
                        console.log(response.status)
                        getFriends().then((response)=>{
                            if (response.status === 200){
                                setFriends({
                                    data: response.data,
                                })
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
                setFriends({
                    data: response.data,
                })
            }
        })
    }, [])

    const removeFriend = (name) => {
        setFriends({
            data: friends.data.filter(el => el !== name)
        })
    }

    let content = ( <Box display="flex" justifyContent="center" alignItems="center" sx={{ display: 'flex', color: 'grey.500' }}>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <CircularProgress size="7rem" color="inherit"/>
                    </Box>)
    console.log(friends.data)
    if (friends.data){
        if (friends.data.length === 0){
            content = (<div className="none">No Friends</div>)
        }
        else{
            content = friends.data.map((friend, key)=>

            <FriendCard friend={friend} removeFriend={removeFriend}/>

            )
        }
    }

    return (
        <div>
            {content}
        </div>
    )
}
export default Friends;