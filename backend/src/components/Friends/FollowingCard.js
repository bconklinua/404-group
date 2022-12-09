import React from 'react'
import './ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea, Button } from '@mui/material';
import { unFollow } from '../../api/Friends';
import { refreshToken } from '../../api/User';
import { useNavigate } from "react-router-dom";
import { Team13Unfollow } from '../../api/Remote13';


const FollowerCard = (props) => {
    const navigate = useNavigate();
    const handleClick = () =>{
        console.log(props.following)
        //window.location.href = `/user/${props.following.recipient_id}`
        var team = 12
        if (props.following.recipient_host === 'https://cmput404-team13.herokuapp.com') team = 13
        else if (props.following.recipient_host === 'https://social-distribution-404.herokuapp.com') team = 19
        navigate(`/user/${props.following.recipient_id}/${props.following.recipient_username}/${team}`);
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
        if (props.following.recipient_host === 'https://cmput404-team13.herokuapp.com'){
            Team13Unfollow(props.following.recipient_id).then((response)=>{
                console.log(response)
            })
        }else if(props.following.recipient_host === 'https://social-distribution-404.herokuapp.com'){
            console.log('team 19')
        }   
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