import React from 'react';
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";

export default function LikesCard(props) {
  const navigate = useNavigate();
  const handleClick = (e) =>{
    //window.location.href = `/posts/${props.post.id}`
    //navigate(`/post/${props.post.id}`, {state: props.post});
    console.log(props)
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={1} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
        <Card sx={{ minWidth:500, maxWidth: 500 }}>
            <CardActionArea onClick={handleClick}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                <Favorite/> {props.like.summary}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    post: {props.like.post.title}
                </Typography>
                
            </CardContent>
            </CardActionArea>
        </Card>
    </Box>
  );
}