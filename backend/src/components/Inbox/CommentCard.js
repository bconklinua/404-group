import React from 'react';
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';

export default function CommentCard(props) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={1} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
        <Card sx={{ minWidth:500, maxWidth: 500 }}>

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {props.comment.author} commented {props.comment.comment}
                </Typography>
                <Typography variant="h7" color="text.secondary">
                    post: {props.comment.post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.comment.published}
                </Typography>
            </CardContent>

        </Card>
    </Box>
  );
}