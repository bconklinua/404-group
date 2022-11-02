import React from 'react'
import './ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea, Button } from '@mui/material';
import { unFollow } from '../../api/Friends';
import { refreshToken } from '../../api/User';

const FollowerCard = (props) => {
    const handleClick = () =>{
        console.log(props.following)
        window.location.href = `/user/${props.following.recipient_id}`
    }
    const handleUnFollow = ()=> {

        unFollow(props.following.recipient_id).then((response) =>{
            if (response.status === 401){
                // if token expired
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("Refresh Token")
                        unFollow(props.following.recipient_id).then((response)=>{
                            if (response.status === 401){
                                localStorage.clear()
                                window.location.reload();
                                window.location.href = '/login';  
  
                            }
                            else{
                                props.removeFollowing(props.following)
                                console.log(response)
                            }
                        }) 
                        
                    }
                    else{
                        localStorage.clear()
                        window.location.reload();
                        window.location.href = '/login';
                    }
                })

            }else{
                props.removeFollowing(props.following)
                console.log(response)
            }
            console.log(response.status)
        })
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
        <Button onClick={handleUnFollow}>Un-Follow</Button>
        </Card>
    </Box>
    )
}

export default FollowerCard;