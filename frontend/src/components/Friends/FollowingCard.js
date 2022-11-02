import React from 'react'
import './ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material';

const FollowerCard = (props) => {
    const handleClick = () =>{
        console.log(props.following)
        window.location.href = `/user/${props.following.recipient_id}`
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={1} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
        <Card sx={{ minWidth:500, maxWidth: 500 }}>
        <CardActionArea onClick={handleClick}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {props.following.recipient_username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {props.following.recipient_email}
                </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </Box>
    )
}

export default FollowerCard;