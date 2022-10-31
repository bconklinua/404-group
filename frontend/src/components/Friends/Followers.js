import react, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { getFollowers } from '../../api/Friends'
import { refreshToken } from '../../api/User'
import FollowerCard from './FollowerCard'

const Followers = () => {
    const [followers, setFollowers] = useState({
        data: null,
    })
    useEffect(()=>{
        setFollowers({
            data: null,
        })
        getFollowers().then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("refresh token")
                        console.log(response.status)
                        getFollowers().then((response)=>{
                            if (response.status === 200){
                                setFollowers({
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
                setFollowers({
                    data: response.data,
                })
            }
        })
    }, [])

    let content = null;
    console.log(followers.data)
    if (followers.data){
        if (followers.data.length === 0){
            content = (<div className="none">No Followers</div>)
        }
        else{
            content = followers.data.map((follower, key)=>

            <FollowerCard follower={follower}/>

            )
        }
    }

    return (
        <div>
            {content}
        </div>
    )
}
export default Followers;