import React from 'react'
import './ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea, Button } from '@mui/material';

const FriendCard = (props) => {
    const handleClick = () =>{
        console.log(props.friend)
        window.location.href = `/user/${props.friend.friend_id}`
    }
    const handleUnBefriend = ()=> {
        console.log("UnBefriend")
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={1} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
        <Card sx={{ minWidth:500, maxWidth: 500 }}>
        <CardActionArea onClick={handleClick}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {props.friend.friend_username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {props.friend.friend_email}
                </Typography>
            </CardContent>
        </CardActionArea>
        <Button onClick={handleUnBefriend}>Un-Befriend</Button>
        </Card>
    </Box>
    )
}

export default FriendCard;