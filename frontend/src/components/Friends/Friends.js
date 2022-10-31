import react, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { getFriends } from '../../api/Friends'
import { refreshToken } from '../../api/User'
import FollowerCard from './FollowerCard'

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
                setFriends({
                    data: response.data,
                })
            }
        })
    }, [])

    let content = null;
    console.log(friends.data)
    if (friends.data){
        if (friends.data.length === 0){
            content = (<div className="none">No Friends</div>)
        }
        else{
            content = friends.data.map((friend, key)=>

            <FollowerCard friend={friend}/>

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