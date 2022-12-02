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
    const [profile, setProfile] = useState({})
    useEffect(()=>{
        setProfile({})
        if (team === '12'){
            getUser(user_id).then((response)=>{
                if (response.status === 200){
                    setProfile(response.data)
                }
            })
        }
        else if (team === '13'){
            Team13GetUser(user_id).then((response)=>{
                if (response.status === 200){
                    setProfile(response.data)
                }  
            })
        }else if (team === '19'){
            Team19GetUser(user_id).then((response)=>{
                if (response.status === 200){
                    setProfile(response.data)
                }
            })
        }else if (team === '10'){
            Team10GetAuthor(user_id).then((response)=>{
                if (response.status === 200){
                    setProfile(response.data)
                }
            })
        }

    }, [])
    return (
        <main>
            <div>
            <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={2} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>


                <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                <Avatar style={{ justifyContent: "center", display: "flex" }} src={profile.profile_image} sx={{ width: 200, height: 200 }}/>
                </Box>
                <Box justifyContent="center" alignItems="center" p={2}>
                <Typography gutterBottom variant="h5" component="div">
                    {profile.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    description: {profile.email}
                </Typography>
                <br/>

                </Box>
                

            </Box>

            </div>
        </main>
    )

}
export default ProfileCardView