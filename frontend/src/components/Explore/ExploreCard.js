import React from 'react'
import '../Friends/ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material';


const ExploreCard = (props) => {

    const handleClick = () =>{
        console.log(props.user.username)
        window.location.href = `/user/${props.user.id}/${props.user.username}`
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
            </Card>
        </Box>
    )
}

export default ExploreCard;