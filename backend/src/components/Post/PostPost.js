import react, {useState} from 'react'
import {Link} from 'react-router-dom'
import { postPost } from '../../api/Post'
import {PhotoCamera} from '@mui/icons-material'
import { Switch, FormControlLabel, Button, IconButton, Box, Card, CardContent, Typography, TextareaAutosize } from '@mui/material'
import { refreshToken } from '../../api/User'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Team13PostPost, Team13SendInbox } from '../../api/Remote13'
import { Team19PostPost } from '../../api/Remote19'
import { getFollowers } from '../../api/Friends'

const PostPost = () => {
    const [visibility, setVisibility] = useState(false)
    const [image, setImage] = useState(null)
    const [unlisted, setUnlisted] = useState(false)
    const [file, setFile] = useState(undefined)

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target)
        const json = Object.fromEntries(data.entries())
        if (visibility){
            json["visibility"] = "PUBLIC"
        }else{
            json["visibility"] = "FRIENDS"
        }
        json["unlisted"] = unlisted
        // if (image){
        //     json["image"] = image
        // }
        json["unlisted"] = unlisted

        if (image && json.image_url){
            toast.error('cannot have both image link and image')
        }
        else{
            if (image){
                json["image_url"] = image
            }
            postPost(json).then((response)=>{
                if (response.status === 401){
                    refreshToken().then((response)=>{
                        if (response.status === 200){
                            console.log("refresh token")
                            console.log(response.status)
                            postPost(json).then((response)=>{
                                if (response.status === 201){
                                    console.log("posted")
                                    toast.success('Posted!')
                                    window.location.href = '/home'; 
                                }
                                else if (response.status === 401){
                                    console.log("not authenticated")
                                    localStorage.removeItem("refresh_token")
                                    window.location.reload();
                                    window.location.href = '/login'; 
                                }
                                else{
                                    console.log(response)
                                    toast.error('Not Posted')
                                }

                            })
                        }
                        else{
                            window.location.reload();
                            window.location.href = '/login';
                            
                        }
                    })
                }else if (response.status === 201){
                    if (response.data.team13_followers === true){
                        Team13PostPost(response.data.id, response.data).then((response)=>{
                            if (response.status === 200){
                                if (typeof response.data === 'object'){
                                    Team13SendInbox(response.data.id, response.data.visibility).then((response)=>{
                                        console.log('team 13 inbox')
                                        console.log(response)
                                    })

                                    console.log('team 13 followers')
                                    console.log(response)
                                }else{
                                    console.log('error')
                                }

                            }

                        })
                    }else console.log('no team 13 followers')
                    if (response.data.team19_followers === false){

                    }else console.log('no team 19 followers')

                    console.log("posted")
                    toast.success('Posted!')
                    //window.location.href = '/home'; 
                    console.log(response)
                    document.getElementById('title').value=''
                    document.getElementById('description').value=''
                    document.getElementById('content').value=''
                    document.getElementById('image_url').value=''
                    setImage(null)
                    setFile(undefined)

                    console.log(response)
                }
                
                else{
                    toast.error('Not Posted')
                }
                console.log(response)
            })
            getFollowers().then((response)=>{
                for (let i = 0; i < response.data.length; i++){
                    if (response.data[i].sender_host === "https://true-friends-404.herokuapp.com"){
                        console.log('team 19 follower')
                        // Team19PostPost(json, response.data[i].sender_id).then((response)=>{
                        //     console.log(response)
                        // })
                    }
                }
                console.log("creatine")
                console.log(response)
                // Team19PostPost(response.data).then((response)=>{
                //     console.log(response)
                // })
            })


            console.log(json)
        }
    }
    const handleChange = (e) =>{
        setVisibility(e.target.checked)
        console.log("visibility")
    }
    const uploadImage = (e) =>{


        if (e.target.files[0]){
            const img = e.target.files[0];
            const reader = new FileReader();
    
            reader.onloadend = () => {
                setImage(reader.result.toString());
                console.log('loaded')
                console.log(reader.result.toString());
                setFile(URL.createObjectURL(e.target.files[0]))
            }
            reader.readAsDataURL(img)
        }
        else {
            setImage(null)
            setFile(undefined)
        }
        //console.log(e.target.files[0])
    }
    const handleUnlisted = (e) =>{
        setUnlisted(e.target.checked)
        console.log("unlisted")
    }


    return (
        // <main>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //         <h1>Post A post</h1>
        //         <input placeholder="title" name='title'/>
        //         <input placeholder="description" name='description'/>
        //         <input placeholder="content" name='content'/>
        //         <IconButton color="secondary" aria-label="upload picture" component="label">
        //         <input hidden accept="image/png, image/jpeg" name='file' type="file" onChange={uploadImage}/>
        //         <PhotoCamera />
        //         </IconButton>
        //         { file && <img src={file}/>}
        //         <FormControlLabel label="public" control={<Switch checked={visibility} color="secondary" onChange={handleChange}/>}/>
        //         <FormControlLabel label="unlisted" control={<Switch checked={unlisted} color="secondary" onChange={handleUnlisted}/>}/>
        //         <Button type="submit" onSubmit={handleSubmit} color='secondary'>Submit</Button>
        //         </div>
        //     </form>
        // </main>
        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={2} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>

            <Card sx={{ minWidth:500, maxWidth: 1000 }}>

                <CardContent>
                    { file && <img src={file}/>}
                    <main>
                        <form onSubmit={handleSubmit}>
                            <div>
                            <h1>Post A post</h1>
                            <br/>
                            <Typography gutterBottom variant="h5" component="div">
                                <input className='input1' placeholder="title" name='title' id='title'/>
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                <TextareaAutosize className='input1' aria-label="minimum height" minRows={3} style={{ width: 200 }} placeholder="description" name='description' id='description'/>
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                <input className='input1' placeholder="content" name='content' id='content'/>
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                <input className='input1' placeholder="image link" name='image_url' id='image_url'/>
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                <IconButton color="primary" aria-label="upload picture" component="label">
                                    <input hidden accept="image/png, image/jpeg" name='file' type="file" onChange={uploadImage}/>
                                    <PhotoCamera />
                                </IconButton>
                            </Typography>



                            <FormControlLabel label="public" control={<Switch checked={visibility} color='primary' onChange={handleChange}/>}/>
                            <FormControlLabel label="unlisted" control={<Switch checked={unlisted} color="primary" onChange={handleUnlisted}/>}/>
                            <Typography gutterBottom variant="h5" component="div">
                                <Button type="submit" onSubmit={handleSubmit} color='primary'>Submit</Button>
                            </Typography>
                            
                            </div>
                        </form>
                    </main>
                </CardContent>


            </Card>

        </Box>

    )
}
export default PostPost;