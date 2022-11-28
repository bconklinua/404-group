import React from 'react'
import './ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from "react-router-dom";
const FollowerCard = (props) => {
    const navigate = useNavigate();
    const handleClick = () =>{
        console.log(props.follower)
        //window.location.href = `/user/${props.follower.sender_id}`
        var team = 12
        if (props.follower.sender_host === 'https://cmput404-team13.herokuapp.com') team = 13
        else if (props.follower.sender_host === 'https://social-distribution-404.herokuapp.com') team = 19
        navigate(`/user/${props.follower.sender_id}/${props.follower.sender_username}/${team}`);
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={1} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
        <Card sx={{ minWidth:500, maxWidth: 500 }}>
        <CardActionArea onClick={handleClick}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {props.follower.sender_username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {props.follower.sender_email}
                </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </Box>
    )
}

export default FollowerCard;