import react, { useState, useEffect } from 'react'

import {Box, Tab, Card, CardContent, Typography, Avatar, Grid, Button} from '@mui/material'
import '../Profile/Profile.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getUser } from '../../api/User'
import { Team13GetUser } from '../../api/Remote13'
import { Team19GetUser } from '../../api/Remote19'
import { Team10GetAuthor } from '../../api/Remote10'

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

                </Box>
                

            </Box>

            </div>
        </main>
    )

}
export default ProfileCardView