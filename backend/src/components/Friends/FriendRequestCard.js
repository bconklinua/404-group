import React from 'react'
import './ProfileCard.css'
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { acceptFollower, rejectFollower } from '../../api/Friends';
import { refreshToken } from '../../api/User';
import { Team13AcceptRequest, Team13RejectRequest } from '../../api/Remote13';
import { toast } from 'react-toastify';

const FriendRequestCard = (props) => {
    const accept = (e) => {
        acceptFollower(props.request.id).then((response) =>{
            if (response.status === 401){
                // if token expired
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("Refresh Token")
                        acceptFollower(props.request.id).then((response)=>{
                            if (response.status === 401){
                                // window.location.reload();
                                // window.location.href = '/login';  
                                console.log(response.status)        
                            }
                            else{
                                props.removeRequest(props.request)
                                console.log(response)
                            }

                        }) 
                        
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                    }
                })
            }else if (response.status === 200){
        
                if (response.data.network === "team13_to_truefriends"){
                    Team13AcceptRequest(props.request.sender_id).then((response) =>{
                        console.log('team13 accept request response')
                        console.log(response)
                    })
                }else if (props.request.network === "team19_to_truefriends"){
                    console.log('team 19 accept')
                }
                props.removeRequest(props.request)
                console.log(response)
            }else{
                toast.error("error accepting request")
            }
            console.log("accept response")
            console.log(response)
            console.log(props.request.sender_id)
        })


        
    
    }
    const reject = (e) => {
        rejectFollower(props.request.id).then((response) =>{
            if (response.status === 401){
                // if token expired
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("Refresh Token")
                        rejectFollower(props.request.id).then((response)=>{
                            if (response.status === 401){
                                // window.location.reload();
                                // window.location.href = '/login';  
                                console.log(response.status)        
                            }
                            else{
                                props.removeRequest(props.request)
                                console.log(response)
                            }
                        }) 
                        
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                    }
                })

            }else if (response.status === 200){
                if (response.data.network === "team13_to_truefriends"){
                    Team13RejectRequest(props.request.sender_id).then((response) =>{
                        console.log('team13 reject request response')
                        console.log(response)
                    })
                }else if (props.request.network === "team19_to_truefriends"){
                    console.log('team 19 reject')
                }
                console.log("reject response")
                console.log(response)
                props.removeRequest(props.request)
                console.log(response)
            }else{
                toast.error("error rejecting request")
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