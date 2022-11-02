import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Favorite from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Box, Button, CardActionArea } from '@mui/material';
import { doLike } from '../../api/Likes';
import { refreshToken } from '../../api/User';
import PostView from '../PostView/PostView';


const PostViewCard = (props) => {
    
    let content = null
    if (props.post.image){
        console.log(props.post.image)
        let imgurl = `http://localhost:8000${props.post.image}`
        content = (
            <CardMedia height="20%" component='img' image={imgurl}/>
            // <img src={imgurl} alt="Girl in a jacket" ></img>
        )
    }else{
        content = (<h4>{props.post.content}</h4>)
    }  

    const handleClick = (e) =>{
        console.log("true")
    }
    const handleLike = (e) =>{
        e.preventDefault();
        doLike(props.post.id).then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("refresh token")
                        console.log(response.status)
                        doLike(props.post.id).then((response)=>{
                            if (response.status === 201){
                                console.log("liked")
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
            }else if (response.status === 201)
                console.log("liked")
        })
        console.log(props.post.id)
    }

    let extraContent = (
    <div>
        <IconButton onClick={handleLike} size="small" color="secondary">
            <Favorite/>
        </IconButton>
        {props.post.count}
    </div>
    ) 
    if ('' + props.post.author === localStorage.getItem("authorID")){
        
        extraContent = (    
        <div className='card1'>
            <div className='box2'>
            <div>
                <IconButton onClick={handleLike} size="small" color="secondary">
                    <Favorite/>
                </IconButton>
                {props.post.count}
            </div>
            
            <div>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </div>
            </div>
        </div>)
    }

    return (

        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={2} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>

            <Card sx={{ minWidth:500, maxWidth: 1000 }}>
                <CardActionArea onClick={handleClick}>
                    {content}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.post.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                {extraContent}

            </Card>

        </Box>

    )
}

export default PostViewCard;