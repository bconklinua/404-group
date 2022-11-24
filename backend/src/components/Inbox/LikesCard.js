import React from 'react';
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';

export default function LikesCard(props) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={1} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
        <Card sx={{ minWidth:500, maxWidth: 500 }}>

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                <Favorite/> {props.like.summary}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    post: {props.like.post.title}
                </Typography>
            </CardContent>

        </Card>
    </Box>
  );
}