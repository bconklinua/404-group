import react, { useState } from 'react'

import {Box, Tab} from '@mui/material'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import Followers from '../Friends/Followers'
import InboxView from './InboxView'
import '../Profile/Profile.css'

const Inbox = () =>{

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

            <div>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <TabList textColor='secondary' onChange={handleChange} aria-label="tabs example" centered>
                        <Tab label="Posts" value="1" />
                        <Tab label="Likes" value="2"/>
                        <Tab label="Comments" value="3"/>
                    </TabList>
                </Box>
                
                <TabPanel value="1"> <InboxView selection="posts"/> </TabPanel>
                <TabPanel value="2"> <InboxView selection="likes"/></TabPanel>
                <TabPanel value="3"> <InboxView selection="comments"/></TabPanel>
            </TabContext>

            </div>
        </main>
    )

}
export default Inbox