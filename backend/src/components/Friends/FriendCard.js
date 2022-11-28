import React from 'react'
import './ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea, Button } from '@mui/material';
import { refreshToken } from '../../api/User';
import { unFriend } from '../../api/Friends';
import { useNavigate } from "react-router-dom";

const FriendCard = (props) => {
    const navigate = useNavigate();
    const handleClick = () =>{
        console.log(props.friend)
        //window.location.href = `/user/${props.friend.friend_id}`
        var team = 12
        if (props.friend.friend_host === 'https://cmput404-team13.herokuapp.com') team = 13
        else if (props.friend.friend_host === 'https://social-distribution-404.herokuapp.com') team = 19
        navigate(`/user/${props.friend.friend_id}/${props.friend.friend_username}/${team}`);
    }
    const handleUnBefriend = ()=> {

        unFriend(props.friend.friend_id).then((response) =>{
            if (response.status === 401){
                // if token expired
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("Refresh Token")
                        unFriend(props.friend.friend_id).then((response)=>{
                            if (response.status === 401){
                                localStorage.clear();
                                window.location.reload();
                                window.location.href = '/login';  
                                console.log(response.status)        
                            }
                            else{
                                props.removeFriend(props.friend)
                                console.log(response)
                            }
                        }) 
                        
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                    }
                })

            }else{
                props.removeFriend(props.friend)
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
                {props.friend.friend_username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {props.friend.friend_email}
                </Typography>
            </CardContent>
        </CardActionArea>
        <Button onClick={handleUnBefriend}>Un-Befriend</Button>
        </Card>
    </Box>
    )
}

export default FriendCard;