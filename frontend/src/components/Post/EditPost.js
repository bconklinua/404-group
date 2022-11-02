import react, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { editPost, getPostByID   } from '../../api/Post'
import {Description, PhotoCamera} from '@mui/icons-material'
import { Switch, FormControlLabel, Button, IconButton, Box, Card, CardContent, Typography, TextareaAutosize } from '@mui/material'
import { refreshToken } from '../../api/User'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditPost = () => {
    const [visibility, setVisibility] = useState(false)
    const [image, setImage] = useState(null)
    const [unlisted, setUnlisted] = useState(false)
    const [file, setFile] = useState(undefined)
    const {post_id} = useParams();
    const [urlImage, setUrlImage] = useState(null)
    // const [fields, setFields] = useState({
    //     title: "",
    //     Description: "",

    // })
    const setFields = (data) =>{
        console.log(data)
        document.getElementById('title').value=data.title
        document.getElementById('description').value=data.description
        document.getElementById('content').value=data.content
        
        if (data.image){
            document.getElementById('image_url').value=`http://localhost:8000${data.image}`
            setUrlImage(`http://localhost:8000${data.image}`)
        }
            
        else if (data.image_url != "")
            document.getElementById('image_url').value=data.image_url
            setUrlImage(data.image_url)

    }

    useEffect(()=>{
        getPostByID(post_id).then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("success")
                        console.log(response.status)
                        getPostByID(post_id).then((response)=>{
                            if (response.status === 200){
                                setFields(response.data)
                            }
                            else{
                                localStorage.removeItem("refresh_token")
                                window.location.reload();
                                window.location.href = '/login'; 
                            }
                            console.log("true");
                        })
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                        
                    }
                })
            }else if (response.status === 200){
                console.log(response)
                setFields(response.data)
            }
        })
    }, [])

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
        if (image){
            json["image"] = image
        }
        json["unlisted"] = unlisted
        json["post_id"] = post_id

        if (image && json.image_url){
            toast.error('cannot have both image link and image')
        }
        else{
        editPost(json).then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("refresh token")
                        console.log(response.status)
                        editPost(json).then((response)=>{
                            if (response.status === 200){
                                console.log("posted")
                                toast.success('Edited')
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
            }else if (response.status === 200){
                console.log("posted")
                toast.success('Edited')
                window.location.href = '/home'; 
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
            setImage(e.target.files[0])
            setFile(URL.createObjectURL(e.target.files[0]))
        }
        else {
            setImage(null)
            setFile(undefined)
        }
        console.log(e.target.files[0])
    }
    const handleUnlisted = (e) =>{
        setUnlisted(e.target.checked)
        console.log("unlisted")
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={2} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>

            <Card sx={{ minWidth:500, maxWidth: 1000 }}>

                <CardContent>

                    { file && <img src={file}/>}
                    <main>
                        <form onSubmit={handleSubmit}>
                            <div>
                            <h1>Edit A post</h1>
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
export default EditPost;