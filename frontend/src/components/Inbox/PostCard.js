import React from 'react';
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';

export default function PostCard(props) {
    const handleClick = (e) =>{
        window.location.href = `/posts/${props.post.id}`
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={1} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
            <Card sx={{ minWidth:500, maxWidth: 500 }}>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {props.post.author} posted {props.post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {props.post.published}
                    </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
        </Box>
    );
}