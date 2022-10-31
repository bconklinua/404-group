import react, {useState} from 'react'
import {Link} from 'react-router-dom'

import { Switch, FormControlLabel } from '@mui/material'

const PostPost = () => {
    const [checked, setChecked] = useState(false)
    console.log({checked})
    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target)
        const json = Object.fromEntries(data.entries())
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
                <input placeholder="k" name='k'/>
                <input placeholder="kk" name='kk'/>
                <input placeholder="kkk" name='kkk'/>
                <FormControlLabel control={<Switch checked={checked} color="secondary" onChange={handleChange}/>}/>
                
                <button onSubmit={handleSubmit}>Submit</button>
                </div>
            </form>
        </main>
    )
}
export default PostPost;