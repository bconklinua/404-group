import React from 'react'
import '../Friends/ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea, Button, Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendRemoteFriendRequest } from '../../api/Friends';
import { refreshToken } from '../../api/User';
import { Team13SendRequest } from '../../api/Remote13';
import { useNavigate } from "react-router-dom";

const SearchCard = (props) => {
    const navigate = useNavigate();
    var team = "team 10"
    var username = props.user.displayName
    if (props.user.host === "https://true-friends-404.herokuapp.com"){
        team = "team 12"
        username = props.user.username
    }else if (props.user.host === "https://social-distribution-404.herokuapp.com/"){
        team = "team 19"
        
    }else if (props.user.host === "https://cmput404-team13.herokuapp.com"){
        team = "team 13"
    }
    const handleClick = (e) =>{
        console.log(props.user.username)
        if (team === "team 10"){
            navigate(`/user/${props.user.id}/${username}/10`);
        }else if (team === "team 12"){
            navigate(`/user/${props.user.id}/${username}/12`);
        }else if (team === "team 13"){

            navigate(`/user/${props.user.id}/${username}/13`);
        }else if (team === "team 19"){

            navigate(`/user/${props.user.id}/${username}/19`);
        }else{
            toast.error("Something Terrible happened!")
        }
        
    }
    const handleFriendRequest = (e) =>{
        console.log(team)
        if (team === "team 10"){
            toast.success(team)
        }else if (team === "team 12"){
            toast.success(team)
        }else if (team === "team 13"){
            toast.success(team)
        }else if (team === "team 19"){
            toast.success(team)
        }else{
            toast.error("Something Terrible happened!")
        }

    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={1} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
            <Card sx={{ minWidth:500, maxWidth: 500 }}>
            <CardActionArea onClick={handleClick}>

                <CardContent>
                    <Box display="flex" sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
                        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                        <Avatar style={{ justifyContent: "center", display: "flex" }} src={props.user.profile_image} sx={{ width: 50, height: 50 }}/>
                        </Box>
                        <Box justifyContent="center" alignItems="center" p={2}>
                        <Typography gutterBottom variant="h5" component="div">
                        {username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {team}
                        </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
            <Button onClick={handleFriendRequest}>Friend Request</Button>
            </Card>
            
        </Box>
    )
}

export default SearchCard;