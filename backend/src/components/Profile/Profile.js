import react, { useState } from 'react'

import {Box, Tab} from '@mui/material'
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

const Profile = () =>{

    const [value, setValue]= useState('1')

    const [profile, setProfile] = useState({
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email")
    })
    const handleChange = (e, newValue) =>{
        setValue(newValue)
    }

    return (
        <main>
            <h1 className='profileName'>{profile.username}</h1>
            <body className='profileName'>{profile.email} </body>
            <div>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <TabList  textColor='secondary' onChange={handleChange} aria-label="tabs example" centered>
                        <Tab label="My Post" value="1" />
                        <Tab label="Friends" value="2"/>
                        <Tab label="Follower" value="3"/>
                        <Tab label="Following" value="4"/>
                        <Tab label="Friend Requests" value="5"/>
                        <Tab label="Explore" value="6"/>
                        <Tab label="Team 13" value="7"/>
                        <Tab label="Team 19" value="8"/>
                    </TabList>
                </Box>
                
                <TabPanel value="1"> <MyPosts/> </TabPanel>
                <TabPanel value="2"> <Friends/></TabPanel>
                <TabPanel value="3"> <Followers/></TabPanel>
                <TabPanel value="4"> <Followings/></TabPanel>
                <TabPanel value="5"> <FriendRequestPage/></TabPanel>
                <TabPanel value="6"> <Explore/></TabPanel>
                <TabPanel value="7"> <Team13/></TabPanel>
                <TabPanel value="8"> <Team19/></TabPanel>
            </TabContext>

            </div>
        </main>
    )

}
export default Profile