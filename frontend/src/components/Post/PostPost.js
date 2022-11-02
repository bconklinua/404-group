import react, {useState} from 'react'
import {Link} from 'react-router-dom'
import { postPost } from '../../api/Post'

import { Switch, FormControlLabel, Button } from '@mui/material'
import { refreshToken } from '../../api/User'

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
        if (image){
            json["image"] = image
        }
        json["unlisted"] = unlisted
        console.log(json)
        postPost(json).then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("refresh token")
                        console.log(response.status)
                        postPost(json).then((response)=>{
                            if (response.status === 200){
                                console.log("posted")
                            }
                            else if (response.status === 401){
                                console.log("not authenticated")
                                localStorage.removeItem("refresh_token")
                                window.location.reload();
                                window.location.href = '/login'; 
                            }
                            else{
                                console.log(response)
                            }

                        })
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                        
                    }
                })
            }else if (response.status === 200)
                console.log("posted")
        })
        console.log(json)
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
        <main>
            <form onSubmit={handleSubmit}>
                <div>
                <h1>Post A post</h1>
                <input placeholder="title" name='title'/>
                <input placeholder="description" name='description'/>
                <input placeholder="content" name='content'/>
                <input placeholder="UploadImage" name='file' type="file" accept="image/png, image/jpeg" onChange={uploadImage}/>
                { file && <img src={file}/>}
                <FormControlLabel label="public" control={<Switch checked={visibility} color="secondary" onChange={handleChange}/>}/>
                <FormControlLabel label="unlisted" control={<Switch checked={unlisted} color="secondary" onChange={handleUnlisted}/>}/>
                <button onSubmit={handleSubmit}>Submit</button>
                </div>
            </form>
        </main>
    )
}
export default PostPost;