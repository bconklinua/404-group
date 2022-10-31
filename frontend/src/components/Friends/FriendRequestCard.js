import React from 'react'
import './ProfileCard.css'
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { acceptFollower, rejectFollower } from '../../api/Friends';
import { refreshToken } from '../../api/User';

const FriendRequestCard = (props) => {
    const accept = (e) => {
        acceptFollower(props.request.sender_id).then((response) =>{
            if (response.status === 401){
                // if token expired
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("Refresh Token")
                        acceptFollower(props.request.sender_id).then((response)=>{
                            window.location.reload()
                            console.log(response)
                        }) 
                        
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                    }
                })

            }else{
                console.log(response)
            }
            console.log(response.status)
        })
    }
    const reject = (e) => {
        rejectFollower(props.request.sender_id).then((response) =>{
            if (response.status === 401){
                // if token expired
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("Refresh Token")
                        rejectFollower(props.request.sender_id).then((response)=>{
                            window.location.reload()
                            console.log(response)
                        }) 
                        
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                    }
                })

            }else{
                console.log(response)
            }
            console.log(response.status)
        })
    }

    return (
        <div className='card'>
            <div className='box1'>
                {props.request.sender_username}
                <div>
                <Button onClick={accept}><CheckIcon/></Button>
                <Button onClick={reject}><CloseIcon color="secondary"/></Button>
                </div>
            </div>
        </div>
    )
}

export default FriendRequestCard;