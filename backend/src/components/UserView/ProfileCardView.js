import react, { useState, useEffect } from 'react'

import {Box, Tab, Card, CardContent, Typography, Avatar, Grid, Button} from '@mui/material'
import '../Profile/Profile.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getUser } from '../../api/User'
import { Team13GetUser, Team13SendRequest } from '../../api/Remote13'
import { Team19GetUser, Team19SendRequest } from '../../api/Remote19'
import { Team10GetAuthor, Team10FriendRequest } from '../../api/Remote10'
import { toast } from 'react-toastify'

import { sendRemoteFriendRequest, sendFriendRequest } from '../../api/Friends';


const ProfileCardView = () =>{
    const {user_id, username, team} = useParams();
    const navigate = useNavigate();
    const [profile_image, setProfileImage] = useState(null)
    const [email, setEmail] = useState('')
    const [github, setGithub] = useState('')
    useEffect(()=>{
        if (team === '12'){
            getUser(user_id).then((response)=>{
                if (response.status === 200){

                    setProfileImage(response.data.profile_image)
                    setEmail(response.data.email)
                    setGithub(response.data.github)
                }
            })
        }
        else if (team === '13'){
            Team13GetUser(user_id).then((response)=>{
                if (response.status === 200){
                    setProfileImage(response.data.profile_image)
                    setEmail(response.data.email)
                    setGithub(response.data.github)
                }  
            })
        }else if (team === '19'){
            Team19GetUser(user_id).then((response)=>{
                if (response.status === 200){
                    setProfileImage(response.data.profile_image)
                    setEmail(response.data.email)
                    setGithub(response.data.github)
                }
            })
        }else if (team === '10'){
            Team10GetAuthor(user_id).then((response)=>{
                if (response.status === 200){
                    setProfileImage(response.data.profile_image)
                    setEmail(response.data.email)
                    setGithub(response.data.github)
                }
            })
        }

    }, [])

    const handleClick = (e) =>{

        if (team === "10"){
            Team10FriendRequest(user_id).then((response) =>{

                if (response.status === 201){
                    
                    toast.success("Request Sent to Team 10")
                }else{
                    toast.error("Failed to send to remote, probably already sent or already following")
                }
                console.log('team 10 debug friend request')
                console.log(response)
            })
            sendRemoteFriendRequest(10, username, user_id).then((response) =>{
                console.log('remoterequest')
                console.log(response)
                if (response.status === 201){
                    toast.success("Request Sent")
                }else if (response.status === 409){
                    toast.warn("Already Sent or Already Following")
                }
                else{
                    console.log(response)
                    toast.error("Something went wrong on our server")
                }
            })
        }else if (team === "12"){
            sendFriendRequest(user_id).then((response) =>{
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
        }else if (team === "13"){
            Team13SendRequest(user_id).then((response) =>{
                console.log("team 13 friend request")
                console.log(response)
                if (response.status === 200){
                    toast.success("Request Sent to Remote")
                }
                else{
                    console.log(response)
                    toast.error("Failed to send to remote, probably already sent or already following")
                    console.log('sent to 13')
                }
    
            })
            sendRemoteFriendRequest(13, username, user_id).then((response) =>{
                console.log('remoterequest')
                console.log(response)
                if (response.status === 201){
                    toast.success("Request Sent")
                }else if (response.status === 409){
                    toast.warn("Already Sent or Already Following")
                }
                else{
                    console.log(response)
                    toast.error("Something went wrong on our server")
                }
            })
        }else if (team === "19"){

            Team19SendRequest(user_id).then((response) =>{
                if (response.status === 401){
    
                }else if (response.status === 201){
                    toast.success("Request Sent to Remote")
                    console.log(response)
                }else if (response.status === 409){
                    toast.warn("Already Sent to Remote or Already Following")
                }
                else{
                    toast.error("Something Terrible Happened")
                    console.log(response.response.data)
                }
                
            })
    
            sendRemoteFriendRequest(19, username, user_id).then((response) =>{
                console.log(response)
                if (response.status === 201){
                    toast.success("Request Sent")
                }else if (response.status === 409){
                    toast.warn("Already Sent or Already Following")
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

    return (
        <main>
            <div>
            <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={2} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>


                <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                <Avatar style={{ justifyContent: "center", display: "flex" }} src={profile_image} sx={{ width: 200, height: 200 }}/>
                </Box>
                <Box justifyContent="center" alignItems="center" p={2}>
                <Typography gutterBottom variant="h5" component="div">
                    {username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {github}
                </Typography>
                <br/>
                <Button onClick={handleClick}>Friend Request</Button>
                <br/>
                </Box>
                

            </Box>

            </div>
        </main>
    )

}
export default ProfileCardView