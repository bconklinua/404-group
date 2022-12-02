import react, { useState } from 'react'

import {Box, Tab, Card, CardContent, Typography, Avatar, Grid, Button} from '@mui/material'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import Followers from '../Friends/Followers'
import FriendRequestPage from '../Friends/FriendRequestPage'
import Followings from '../Friends/Followings'
import Friends from '../Friends/Friends'
import MyPosts from '../Post/MyPosts'
import Explore from '../Explore/Explore'
import Team13 from '../Explore/Team13'
import Team19 from '../Explore/Team19'
import './Profile.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Github from '../Github/Github'

const Profile = () =>{
    const location = useLocation()
    const [value, setValue]= useState('1')
    const navigate = useNavigate();
    const [profile, setProfile] = useState(location.state)
    const handleChange = (e, newValue) =>{
        setValue(newValue)
    }

    // console.log('location.state')
    // console.log(profile.profile_image)

    const handleClick = () => {
        navigate('/editProfile', {state: profile})
    }

    return (
        <main>
            <div>
            <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={2} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>

            {/* <Card sx={{ minWidth:200, maxWidth: 300 }}> */}


                <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                <Avatar style={{ justifyContent: "center", display: "flex" }} src={profile.profile_image} sx={{ width: 200, height: 200 }}/>
                </Box>
                <Box justifyContent="center" alignItems="center" p={2}>
                <Typography gutterBottom variant="h5" component="div">
                    {profile.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {profile.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {profile.github}
                </Typography>
                <br/>
                <Button onClick={handleClick}>Edit Profile</Button>
                </Box>
                
                {/* <Box display="flex" justifyContent="center" alignItems="center" p={2}>

                </Box> */}
                {/* <Typography variant="body2" color="text.secondary">
                Author: <Box fontWeight='bold' display='inline'>{displayName}</Box>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.post.published}
                </Typography> */}


            {/* </Card> */}

            </Box>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <TabList  textColor='secondary' onChange={handleChange} aria-label="tabs example" centered>
                        <Tab label="My Post" value="1" />
                        <Tab label="Github" value="2" />
                        <Tab label="Friends" value="3"/>
                        <Tab label="Follower" value="4"/>
                        <Tab label="Following" value="5"/>
                        <Tab label="Friend Requests" value="6"/>
                        <Tab label="Explore" value="7"/>
                        <Tab label="Team 13" value="8"/>
                        <Tab label="Team 19" value="9"/>
                    </TabList>
                </Box>
                
                <TabPanel value="1"> <MyPosts/> </TabPanel>
                <TabPanel value="2"> <Github/> </TabPanel>
                <TabPanel value="3"> <Friends/></TabPanel>
                <TabPanel value="4"> <Followers/></TabPanel>
                <TabPanel value="5"> <Followings/></TabPanel>
                <TabPanel value="6"> <FriendRequestPage/></TabPanel>
                <TabPanel value="7"> <Explore/></TabPanel>
                <TabPanel value="8"> <Team13/></TabPanel>
                <TabPanel value="9"> <Team19/></TabPanel>
            </TabContext>

            </div>
        </main>
    )

}
export default Profile