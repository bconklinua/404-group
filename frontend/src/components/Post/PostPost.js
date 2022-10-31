import react, {useState} from 'react'
import {Link} from 'react-router-dom'
import { postPost } from '../../api/Post'

import { Switch, FormControlLabel } from '@mui/material'
import { refreshToken } from '../../api/User'

const PostPost = () => {
    const [checked, setChecked] = useState(false)
    console.log({checked})
    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target)
        const json = Object.fromEntries(data.entries())
        postPost(json).then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("refresh token")
                        console.log(response.status)
                        postPost().then((response)=>{
                            if (response.status === 200){
                                console.log("posted")
                            }
                            else{
                                console.log("not authenticated")
                                localStorage.removeItem("refresh_token")
                                window.location.reload();
                                window.location.href = '/login'; 
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
        setChecked(e.target.checked)
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <div>
                <h1>Post A post</h1>
                <input placeholder="title" name='title'/>
                <input placeholder="description" name='description'/>
                <input placeholder="content" name='content'/>
                <FormControlLabel control={<Switch checked={checked} color="secondary" onChange={handleChange}/>}/>
                
                <button onSubmit={handleSubmit}>Submit</button>
                </div>
            </form>
        </main>
    )
}
export default PostPost;