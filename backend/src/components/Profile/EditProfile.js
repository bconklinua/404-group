import react, { useState } from 'react'

import {Box, Tab, Card, CardContent, Typography, Avatar, Grid, Button, IconButton} from '@mui/material'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import './Profile.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { PhotoCamera } from '@mui/icons-material'
import { editUser } from '../../api/User'
import { toast } from 'react-toastify'

const EditProfile = () =>{
    const location = useLocation()
    const [value, setValue]= useState('1')
    const navigate = useNavigate();
    const [profile, setProfile] = useState(location.state)
    const [image, setImage] = useState(profile.profile_image)
    const [profile_image, setProfileImage] = useState(<Avatar style={{ justifyContent: "center", display: "flex" }} src={image} sx={{ width: 200, height: 200 }}/>)
    const handleChange = (e, newValue) =>{
        setValue(newValue)
    }
    console.log('edit profile object')
    console.log(profile.profile_image)

    const uploadImage = (e) =>{


        if (e.target.files[0]){
            const img = e.target.files[0];
            const reader = new FileReader();
    
            reader.onloadend = () => {
                setImage(reader.result.toString());
                setProfileImage(<Avatar style={{ justifyContent: "center", display: "flex" }} src={reader.result.toString()} sx={{ width: 200, height: 200 }}/>);
            }
            reader.readAsDataURL(img)
        }
        else {
            setImage(null)
            setProfileImage(<Avatar style={{ justifyContent: "center", display: "flex" }} src={null} sx={{ width: 200, height: 200 }}/>);
        }
        //console.log(e.target.files[0])
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target)
        const json = Object.fromEntries(data.entries())
        var object = {}
        // TODO: change username
        //if (json.username !== profile.username) object['username'] = json.username
        if (json.email !== profile.email) object['email'] = json.email
        if (json.github !== profile.github) object['github'] = json.github
        if (image !== profile.profile_image) object['profile_image'] = image
        console.log("profile edit")
        console.log(object)
        editUser(object).then((response)=>{
            if (response.status === 200){
                localStorage.setItem("authorID", response.data.id)
                localStorage.setItem("username", response.data.username)
                localStorage.setItem("email", response.data.email)
                localStorage.setItem("github", response.data.github)
                window.location.href = '/home'
            }
            else{
                toast.error("failed to change profile")
            }
            console.log(response)
        })
    }
    return (
        <main>
            <div>
            <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={2} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>

            {/* <Card sx={{ minWidth:200, maxWidth: 300 }}> */}


                {/* <Box display="flex" justifyContent="center" alignItems="center" p={2}>
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
                <Button onClick={handleClick}>Confirm</Button>
                </Box>
                 */}

            <form onSubmit={handleSubmit}>


            <CardContent>            
                <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                {profile_image}
                </Box>
                <Typography gutterBottom variant="h5" component="div">
                    <input className='profileInput' placeholder="username" name='username' id='username' defaultValue={profile.username}/>
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    <input className='profileInput' placeholder="email" name='email' id='email' defaultValue={profile.email}/>
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    <input className='profileInput' placeholder="github" name='github' id='github' defaultValue={profile.github}/>
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/png, image/jpeg" name='file' type="file" onChange={uploadImage}/>
                        <PhotoCamera />
                    </IconButton>
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    <Button type="submit" onSubmit={handleSubmit} color='primary'>Submit</Button>
                </Typography>
            </CardContent>

            </form>
            </Box>
            {/* </Card> */}
            
            </div>
        </main>
    )

}
export default EditProfile