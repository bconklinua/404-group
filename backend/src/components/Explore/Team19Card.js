import React from 'react'
import '../Friends/ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { refreshToken } from '../../api/User';
import { Team19SendRequest } from '../../api/Remote19';
import { sendRemoteFriendRequest } from '../../api/Friends';
import { useNavigate } from "react-router-dom";

const Team19Card = (props) => {
    const navigate = useNavigate();
    const handleClick = () =>{
        console.log(props.user.username)
        window.location.href = `/user/${props.user.id}/${props.user.username}/19`
        navigate(`/user/${props.user.id}/${props.user.username}/19`);
    }
    const handleFriendRequest = () =>{
        var urlID = props.user.id.split('/');
        var id = urlID[urlID.length - 1];
        Team19SendRequest(id).then((response) =>{
            if (response.status === 401){

            }else if (response.status === 201){
                toast.success("Request Sent to Remote")
                console.log(response)
            }else{
                toast.error("Something went wrong")
            }
            console.log(response.status)
        })

        sendRemoteFriendRequest(19, props.user.displayName, id).then((response) =>{
            if (response.status === 201){
                toast.success("Request Sent")
            }
            else{

                toast.error("Something went wrong on our server")
            }
            console.log(response)
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
                    Team 19
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Button onClick={handleFriendRequest}>Friend Request</Button>
            </Card>
            
        </Box>
    )
}

export default Team19Card;