import React from 'react'
import '../Friends/ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendRemoteFriendRequest } from '../../api/Friends';
import { refreshToken } from '../../api/User';
import { Team13SendRequest } from '../../api/Remote13';

const Team13Card = (props) => {

    const handleClick = () =>{
        console.log(props.user.username)
        window.location.href = `/user/${props.user.id}/${props.user.username}`
    }
    const handleFriendRequest = () =>{
        Team13SendRequest(props.user.id).then((response) =>{
            if (response.status === 401){
                // if token expired
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("Refresh Token")
                        Team13SendRequest(props.user.id).then((response)=>{
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
                                toast.error("Something went wrong on their server")
                            }
                        }) 
                        
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                    }
                })

            }else if (response.status === 201){
                toast.accept("Request Sent to Remote")
                console.log(response)
            }else{
                toast.error("Something went wrong")
                console.log(response)
            }
            console.log(response.status)
        })
        sendRemoteFriendRequest(13, props.user.displayName, props.user.id).then((response) =>{
            if (response.status === 201){
                toast.accept("Request Sent")
            }
            else{
                console.log(response)
                toast.error("Something went wrong on our server")
            }
        })

    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={1} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
            <Card sx={{ minWidth:500, maxWidth: 500 }}>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {props.user.displayName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Team 13
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Button onClick={handleFriendRequest}>Friend Request</Button>
            </Card>
            
        </Box>
    )
}

export default Team13Card;