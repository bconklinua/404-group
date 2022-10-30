import react, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { getFollowers } from '../../api/Friends'
import { refreshToken } from '../../api/User'

const Friends = () => {
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
                        console.log("success")
                        console.log(response.status)
                        getFollowers().then((response)=>{
                            if (response.status === 200){
                                setFollowers({
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
                setFollowers({
                    data: response.data,
                })
            }
        })
    }, [])

    let content = null;
    getFollowers().then((response)=>{
        console.log(response)
    })
    console.log(followers.data)
    if (followers.data){
        content = followers.data.map((follower, key)=>
            <div>
                {follower.date}
            </div>
        )
        
    }

    return (
        <div>
            <h1>Friends</h1>
            {content}
        </div>
    )
}
export default Friends;