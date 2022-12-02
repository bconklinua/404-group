import React from 'react'
import '../Friends/ProfileCard.css'
import { Box, CardContent, Typography, Card, IconButton } from '@mui/material'
import Favorite from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { likeComment } from '../../api/Comments';

const CommentCard = (props) => {
    const [likes, setLikes] = useState(0);
    const handleLike = (e) =>{
        setLikes(likes + 1)
        
        likeComment(props).then((response)=>{
            console.log('liked')
            console.log(response)
        })
    }
    var username = props.comment.author
    if (typeof username != "string"){
        username = props.comment.author.displayName
    }

    return (
        // <div className='card'>
        //     <div className='box1'>
        //         {props.comment.comment}
        //     </div>
        // </div>
        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={2} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
            <Card sx={{ minWidth:500, maxWidth: 500 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.comment.comment}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        user: <Box fontWeight='bold' display='inline'>{username}  </Box>
                    </Typography>
                </CardContent>
                <IconButton onClick={handleLike} size="small" color="secondary">
                <Favorite/>
                </IconButton>
                {likes}
            </Card>

        </Box>
    )
}

export default CommentCard;