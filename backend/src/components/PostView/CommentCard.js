import React from 'react'
import '../Friends/ProfileCard.css'
import { Box, CardContent, Typography, Card, IconButton } from '@mui/material'
import Favorite from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { likeComment } from '../../api/Comments';
import { toast } from 'react-toastify';
import { Team13CheckLiked, Team13LikeComment, Team13DeleteLikeComment } from '../../api/Remote13';

const CommentCard = (props) => {
    const [likes, setLikes] = useState(props.comment.count);
    const handleLike = (e) =>{
        
        likeComment(props.comment).then((response)=>{
            console.log('liked')
            console.log(response)
            if (response.status === 201){
                if (props.comment.count !== undefined)
                    setLikes(likes + 1)
            }else if (response.status === 202){
                if (props.comment.count !== undefined)
                    setLikes(likes - 1)
            }else{
                //toast.error("Something Terrible has Happened")
            }
        })
        Team13CheckLiked(props.comment).then((response)=>{
            if (response.data === false){
                Team13LikeComment(props.comment).then((response)=>{
                    toast.success("liked foreign comment")
                    console.log(response)
                })
            }else if (response.data === true){
                Team13DeleteLikeComment(props.comment).then((response)=>{
                    toast.success("unliked foreign comment")
                    console.log(response)
                })
            }else{
                //toast.error('Something Terrible Happened')
            }
            console.log("check like")
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