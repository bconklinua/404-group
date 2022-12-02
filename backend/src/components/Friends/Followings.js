import { useEffect, useState } from 'react'
import { getFollowings } from '../../api/Friends'
import { refreshToken } from '../../api/User'
import FollowingCard from './FollowingCard'
import { CircularProgress, Box } from '@mui/material'

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

    let content = ( <Box display="flex" justifyContent="center" alignItems="center" sx={{ display: 'flex', color: 'grey.500' }}>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <CircularProgress size="7rem" color="inherit"/>
                    </Box>)
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