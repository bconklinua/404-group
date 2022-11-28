import React from 'react'
import '../Friends/ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendFriendRequest } from '../../api/Friends';
import { refreshToken } from '../../api/User';
import { useNavigate } from "react-router-dom";

const ExploreCard = (props) => {
    const navigate = useNavigate();
    const handleClick = () =>{
        console.log(props.user.username)
        //window.location.href = `/user/${props.user.id}/${props.user.username}`
        navigate(`/user/${props.user.id}/${props.user.username}`);
    }
    const handleFriendRequest = () =>{
        sendFriendRequest(props.user.id).then((response) =>{
            if (response.status === 401){
                // if token expired
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("Refresh Token")
                        sendFriendRequest(props.user.id).then((response)=>{
                            if (response.status === 401){
                                localStorage.refresh()
                                window.location.reload();
                                window.location.href = '/login';  
                                console.log(response.status)        
                            }
                            else if (response.status === 201){
                                toast.accept("Request Sent")
                                console.log(response)
                            }else{
                                toast.error("Something went wrong")
                            }
                        }) 
                        
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                    }
                })

            }else if (response.status === 201){
                toast.accept("Request Sent")
                console.log(response)
            }else{
                toast.error("Something went wrong")
            }
            console.log(response.status)
        })
    }
    let button = null
    if (localStorage.getItem("username") != props.user.username){
        button = <Button onClick={handleFriendRequest}>Friend Request</Button>
    }
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={1} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
            <Card sx={{ minWidth:500, maxWidth: 500 }}>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {props.user.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {props.user.email}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {button}
            </Card>
            
        </Box>
    )
}

export default ExploreCard;