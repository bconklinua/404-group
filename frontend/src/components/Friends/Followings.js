import { useEffect, useState } from 'react'
import { getFollowings } from '../../api/Friends'
import { refreshToken } from '../../api/User'
import FollowingCard from './FollowingCard'

const Followings = () => {
    const [followings, setFollowings] = useState({
        data: null,
    })
    useEffect(()=>{
        setFollowings({
            data: null,
        })
        getFollowings().then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("success")
                        console.log(response.status)
                        getFollowings().then((response)=>{
                            if (response.status === 200){
                                setFollowings({
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
                setFollowings({
                    data: response.data,
                })
            }
        })
    }, [])

    const removeFollowing = (name) => {
        setFollowings({
            data: followings.data.filter(el => el !== name)
        })
    }

    let content = null;
    console.log(followings.data)
    if (followings.data){
        if (followings.data.length === 0){
            content = (<div className="none">No Following</div>)
        }
        else{
            content = followings.data.map((following, key)=>

            <FollowingCard following={following} removeFollowing={removeFollowing}/>

            )
        }

    }

    return (
        <div>
            {content}
        </div>
    )
}
export default Followings;