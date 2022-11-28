import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Favorite from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Box, Button, CardActionArea } from '@mui/material';
import './PostCard.css'
import { doLike } from '../../api/Likes';
import { refreshToken } from '../../api/User';
import PostView from '../PostView/PostView';
import { BASE_URL } from '../../api/api';
import { useNavigate } from "react-router-dom";

const PostCard = (props) => {
    const navigate = useNavigate();
    let content = null
    
    if (props.post.image_url != ""){
        content = (<CardMedia height="20%" component='img' image={props.post.image_url}/>)
    }
    else if (props.post.image){
        let imgurl = `${BASE_URL}${props.post.image}`
        content = (
            <CardMedia height="20%" component='img' image={imgurl}/>
            // <img src={imgurl} alt="Girl in a jacket" ></img>
        )
    }else{
        content = (<h4>{props.post.content}</h4>)
    }  

    const handleClick = (e) =>{
        //window.location.href = `/post/${props.post.id}`
        navigate(`/post/${props.post.id}`);
    }

    const [likes, setLikes] = useState(props.post.count);
    const incrementLikes = () => {
        setLikes(likes + 1)
    }
    const decrementLikes = () =>{
        setLikes(likes - 1)
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
                                incrementLikes()
                            }
                            else if (response.status === 202){
                                decrementLikes()
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
            }
            else if (response.status === 201){
                console.log("liked")
                incrementLikes()
            }
            else if (response.status === 202){
                decrementLikes()
            }
        })
        console.log(props.post.id)
    }

    return (

        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={2} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>

            <Card sx={{ minWidth:500, maxWidth: 500 }}>
                <CardActionArea onClick={handleClick}>
                    {content}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            description: {props.post.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        user: <Box fontWeight='bold' display='inline'>{props.post.author}</Box>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.post.published}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <IconButton onClick={handleLike} size="small" color="secondary">
                <Favorite/>
                </IconButton>
                {likes}

            </Card>

        </Box>

    )
}

export default PostCard;