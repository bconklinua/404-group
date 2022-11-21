import React from 'react'
import './ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material';
const FollowerCard = (props) => {
    const handleClick = () =>{
        console.log(props.follower)
        window.location.href = `/user/${props.follower.sender_id}`
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