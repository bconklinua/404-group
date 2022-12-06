import react, {useState} from 'react'
import {Link} from 'react-router-dom'
import { postPost } from '../../api/Post'
import {PhotoCamera} from '@mui/icons-material'
import { Switch, FormControlLabel, Button, IconButton, Box, Card, CardContent, Typography, TextareaAutosize, Autocomplete, Stack, Chip, TextField, CardMedia } from '@mui/material'
import { refreshToken } from '../../api/User'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Team13PostPost, Team13SendInbox } from '../../api/Remote13'
import { Team19PostPost } from '../../api/Remote19'
import { getFollowers, getFriends } from '../../api/Friends'
import ReactMarkdown from 'react-markdown'
import { Team10PostPost } from '../../api/Remote10'

const category = [
    { title: 'Funny' },
    { title: 'Joy' },
    { title: 'Happy' },
    { title: 'Serious' },
    { title: 'Dark' },
    { title: 'Gross' },
    { title: "Anxiety" },
    { title: 'Depression' },

]
const PostPost = () => {
    const [visibility, setVisibility] = useState(false)
    const [image, setImage] = useState(null)
    const [unlisted, setUnlisted] = useState(false)
    const [file, setFile] = useState(undefined)
    const [categories, setCategories] = useState([])
    const [markDown, setMarkDown] = useState(false)
    const [markdownText, setMarkdownText] = useState('')
    const [plain, setPlain] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target)
        const json = Object.fromEntries(data.entries())
        console.log('hello')
        console.log(JSON.stringify(categories))
        if (markDown){
            json["contentType"] = "text/markdown"
        }else{
            json["contentType"] = "text/plain"
        }
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
                    const post = response.data
                    console.log('posting a post')
                    console.log(post)
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
                    if (post.unlisted === true){

                    }
                    else if (post.visibility === "PUBLIC"){
                        getFollowers().then((response)=>{
                            for (let i = 0; i < response.data.length; i++){
                                if (response.data[i].sender_host === "https://social-distribution-404.herokuapp.com"){
                                    console.log('team 19 follower')
                                    Team19PostPost(post, response.data[i].sender_id).then((response)=>{
                                        console.log(response.data[i].sender_username)
                                        console.log(response)
                                    })
                                }else if (response.data[i].sender_host === "https://socioecon.herokuapp.com"){
                                    Team10PostPost(post, response.data[i].sender_id).then((response)=>{
                                        console.log('debug: team 10 sent public post')
                                        console.log(response)
                                    })
                                }
                            }
                            console.log("creatine")
                            console.log(response)
                            // Team19PostPost(response.data).then((response)=>{
                            //     console.log(response)
                            // })
                        })
                    }
                    else if (post.visibility === "FRIENDS"){
                        getFriends().then((response)=>{
                            for (let i = 0; i < response.data.length; i++){
                                if (response.data[i].friend_host === "https://social-distribution-404.herokuapp.com"){
                                    console.log('team 19 friend')
                                    Team19PostPost(post, response.data[i].friend_id).then((response)=>{
                                        console.log('debug: team 19 sent friend post')
                                        console.log(response)
                                    })
                                }else if (response.data[i].friend_host === "https://socioecon.herokuapp.com"){
                                    Team10PostPost(post, response.data[i].friend_id).then((response)=>{
                                        console.log('debug: team 10 sent friend post')
                                        console.log(response)
                                    })
                                }
                            }
                        })
        
                    }

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
                    setMarkdownText('')
                    console.log(response)
                }
                
                else{
                    toast.error('Not Posted')
                }
                console.log(response)
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

    const handleTags = (e, value) =>{
        console.log(e)
        console.log(value)
        setCategories(value)
    }

    const handleMarkDown = (e) =>{
        setMarkDown(e.target.checked)
        console.log(e.target.checked)
        if (e.target.checked === true){
            setPlain('')
            setMarkdownText(plain)
        }else{
            setMarkdownText('')
            setPlain(markdownText)
        }
    }

    const handleContent = (e) =>{
        if (markDown === true){
            setPlain('')
            setMarkdownText(e.target.value)
        }else{
            setMarkdownText('')
            setPlain(e.target.value)
        }

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
        <div>
            <center><h1>Post a Post</h1></center>
        
        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={2} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
            
            <br/><br/><br/><br/><br/>
            <Card sx={{ minWidth:500, maxWidth: 1000 }}>                
                <ReactMarkdown>{markdownText}</ReactMarkdown>
                
                {/* { file && <img src={file}/>} */}
                {file && <CardMedia height="20%" component='img' image={file}/>}
                <CardContent>

                    
                    <main>
                        <form onSubmit={handleSubmit}>
                            <div>
                            {/* <h1>Post A post</h1> */}
                            <br/>

                            <Typography gutterBottom variant="h5" component="div">
                                <input className='input1' placeholder="title" name='title' id='title'/>
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                <TextareaAutosize className='input1' aria-label="minimum height" minRows={3} style={{ width: 200 }} placeholder="description" name='description' id='description'/>
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                <TextareaAutosize className='input1' aria-label="minimum height" minRows={3} style={{ width: 200 }} placeholder="content" name='content' id='content' onChange={handleContent}/>
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
                            <FormControlLabel label="Mark Down" control={<Switch checked={markDown} color="primary" onChange={handleMarkDown}/>}/>
                            <Stack spacing={3} sx={{ width: 500 }}>
                            <Autocomplete
                                multiple
                                id="tags"
                                name='tags'
                                freeSolo
                                options={category.map((option) => option.title)}
                                renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                                }
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    label="Tags"
                                    placeholder="Categories"
                                />
                                )}
                                onChange={handleTags}
                            />
                            </Stack>

                            <Typography gutterBottom variant="h5" component="div">
                                <Button type="submit" onSubmit={handleSubmit} color='primary'>Submit</Button>
                            </Typography>
                            
            
                            </div>
                        </form>
                    </main>
                </CardContent>


            </Card>

        </Box>
        </div>
    )
}
export default PostPost;