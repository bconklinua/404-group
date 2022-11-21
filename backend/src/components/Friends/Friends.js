import react, { useEffect, useState } from 'react'
import { getFriends } from '../../api/Friends'
import { refreshToken } from '../../api/User'
import FriendCard from './FriendCard'
import PostCard from '../Post/PostCard'
import { getPosts } from '../../api/Post'

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

    let content = null;
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