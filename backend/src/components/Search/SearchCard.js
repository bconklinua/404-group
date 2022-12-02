import React from 'react'
import '../Friends/ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendRemoteFriendRequest } from '../../api/Friends';
import { refreshToken } from '../../api/User';
import { Team13SendRequest } from '../../api/Remote13';
import { useNavigate } from "react-router-dom";

const SearchCard = (props) => {
    const navigate = useNavigate();
    var team = "team 10"
    var username = props.user.displayName
    if (props.user.host === "https://true-friends-404.herokuapp.com"){
        team = "team 12"
        username = props.user.username
    }else if (props.user.host === "https://social-distribution-404.herokuapp.com/"){
        team = "team 19"
        
    }else if (props.user.host === "https://cmput404-team13.herokuapp.com"){
        team = "team 13"
    }
    const handleClick = (e) =>{
        console.log(props.user.username)
        //window.location.href = `/user/${props.user.id}/${props.user.username}/13`
        navigate(`/user/${props.user.id}/${props.user.displayName}/13`);
    }
    const handleFriendRequest = (e) =>{
        console.log("team 10 request")
        // sendRemoteFriendRequest(13, props.user.displayName, props.user.id).then((response) =>{
        //     console.log('remoterequest')
        //     console.log(response)
        //     if (response.status === 201){
        //         toast.success("Request Sent")
        //     }else if (response.status === 409){
        //         toast.warn("Already Sent")

        //     }
        //     else{
        //         console.log(response)
        //         toast.error("Something went wrong on our server")
        //     }
        // })

    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={1} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
            <Card sx={{ minWidth:500, maxWidth: 500 }}>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {team}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Button onClick={handleFriendRequest}>Friend Request</Button>
            </Card>
            
        </Box>
    )
}

export default SearchCard;