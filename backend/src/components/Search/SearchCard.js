import React from 'react'
import '../Friends/ProfileCard.css'
import { Box, Typography, Card, CardContent, CardActionArea, Button, Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendRemoteFriendRequest, sendFriendRequest } from '../../api/Friends';
import { refreshToken } from '../../api/User';
import { Team13SendRequest } from '../../api/Remote13';
import { useNavigate } from "react-router-dom";
import { Team19SendRequest } from '../../api/Remote19';

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
            toast.info(team)
        }else if (team === "team 12"){
            sendFriendRequest(props.user.id).then((response) =>{
                if (response.status === 201){
                    toast.success("Request Sent")
                    console.log(response)
                }else if (response.status === 409){
                    toast.warn("Already Sent")
                }
                else{
                    toast.error("Something went wrong")
                }
                console.log(response.status)
            })
        }else if (team === "team 13"){
            Team13SendRequest(props.user.id).then((response) =>{
                console.log("team 13 friend request")
                console.log(response)
                if (response.status === 200){
                    toast.success("Request Sent to Remote")
                }
                else{
                    console.log(response)
                    toast.error("Failed to send to remote, probably already sent")
                    console.log('sent to 13')
                }
    
            })
            sendRemoteFriendRequest(13, props.user.displayName, props.user.id).then((response) =>{
                console.log('remoterequest')
                console.log(response)
                if (response.status === 201){
                    toast.success("Request Sent")
                }else if (response.status === 409){
                    toast.warn("Already Sent")
                }
                else{
                    console.log(response)
                    toast.error("Something went wrong on our server")
                }
            })
        }else if (team === "team 19"){
            var urlID = props.user.id.split('/');
            var id = urlID[urlID.length - 1];
            Team19SendRequest(id).then((response) =>{
                if (response.status === 401){
    
                }else if (response.status === 201){
                    toast.success("Request Sent to Remote")
                    console.log(response)
                }else if (response.status === 409){
                    toast.warn("Already Sent to Remote")
                }
                else{
                    toast.error("Something Terrible Happened")
                    console.log(response.response.data)
                }
                
            })
    
            sendRemoteFriendRequest(19, props.user.displayName, id).then((response) =>{
                console.log(response)
                if (response.status === 201){
                    toast.success("Request Sent")
                }else if (response.status === 409){
                    toast.warn("Already Sent")
                }
                else{
                    console.log(response)
                    toast.error("Something went wrong on our server")
                }
                
            })
        }else{
            toast.error("Something Terrible happened!")
        }

    }
    let button = null
    if (localStorage.getItem("username") !== props.user.username){
        button = <Button onClick={handleFriendRequest}>Friend Request</Button>
    }
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={1} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
            <Card sx={{ minWidth:500, maxWidth: 500 }}>
            <CardActionArea onClick={handleClick}>

                <CardContent>
                    <Box display="flex" sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
                        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                        <Avatar style={{ justifyContent: "center", display: "flex" }} src={props.user.profile_image} sx={{ width: 70, height: 70 }}/>
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
            {button}

            </Card>
            
        </Box>
    )
}

export default SearchCard;