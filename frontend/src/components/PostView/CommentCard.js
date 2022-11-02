import React from 'react'
import '../Friends/ProfileCard.css'
import { Box, CardContent, Typography, Card } from '@mui/material'

const CommentCard = (props) => {

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
                        user: <Box fontWeight='bold' display='inline'>{props.comment.author}  </Box>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CommentCard;