import React from 'react'
import '../Friends/ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendRemoteFriendRequest } from '../../api/Friends';
import { refreshToken } from '../../api/User';
import { Team13SendRequest } from '../../api/Remote13';
import { useNavigate } from "react-router-dom";

const Team13Card = (props) => {
    const navigate = useNavigate();
    const handleClick = () =>{
        console.log(props.user.username)
        window.location.href = `/user/${props.user.id}/${props.user.username}/13`
        navigate(`/user/${props.user.id}/${props.user.username}/13`);
    }
    const handleFriendRequest = () =>{
        Team13SendRequest(props.user.id).then((response) =>{
            // if (response.status === 200){
            //     toast.accept("Request Sent to Remote")
            //     console.log(response)
            // }else{
            //     toast.error("Something went wrong")
            //     console.log(response)
            // }
            if (response){
                toast.error("Something went wrong")
            }
            else{
                console.log(response)
                toast.accept("Request Sent to Remote")
                console.log('sent to 13')
            }

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