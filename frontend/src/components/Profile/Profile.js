import react, { useState } from 'react'
import Tab from '@mui/material/Tab'
import TabList from '@mui/material/Tabs'
import Box from '@mui/material/Box'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Followers from '../Friends/Followers'

const Profile = () =>{

    const [value, setValue]= useState("")

    const [profile, setProfile] = useState({
        username: localStorage.getItem("username"),
    })
    const handleChange = (e, newValue) =>{
        setValue(newValue)
    }

    return (
        <main>
            <h1>{profile.username}</h1>
            <div>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        <Tab label="My Post" value="1" />
                        <Tab label="Friends" value="2"/>
                        <Tab label="Follower" value="3"/>
                        <Tab label="Following" value="4"/>
                        <Tab label="Follow Requests" value="5"/>
                    </TabList>
                </Box>
                
                <TabPanel value="1"> My Posts</TabPanel>
                <TabPanel value="2"> <Followers/></TabPanel>
                <TabPanel value="3"> Follower</TabPanel>
                <TabPanel value="4"> Following</TabPanel>
                <TabPanel value="5"> FollowRequests</TabPanel>
            </TabContext>
            </div>
        </main>
    )

}
export default Profile