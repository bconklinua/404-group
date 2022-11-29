import React, {useState}from 'react'
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
import { deletePost } from '../../api/Post';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../api/api';
import { Team13DeletePost } from '../../api/Remote13';
import { useNavigate } from "react-router-dom";

const PostViewCard = (props) => {
    const navigate = useNavigate();
    let content = null
    var authorID = props.post.author
    if (typeof props.post.author === 'string') {
        
    }else{
        var urlID = props.post.author.id.split('/');
        var id = urlID[urlID.length - 1];
        authorID = id
    }

    if (props.post.image_url != ""){

        console.log(props.post.image_url)
        content = (<CardMedia height="20%" component='img' image={props.post.image_url}/>)
    }
    else if (props.post.image){
        
        console.log("props.post.image")
        let imgurl = `${BASE_URL}${props.post.image}`
        content = (
            <CardMedia height="20%" component='img' image={imgurl}/>
            // <img src={imgurl} alt="Girl in a jacket" ></img>
        )
    }else{
        content = (<h4>{props.post.content}</h4>)
    }  
    const [likes, setLikes] = useState(props.post.count);
    const incrementLikes = () => {
        setLikes(likes + 1)
    }
    const decrementLikes = () =>{
        setLikes(likes - 1)
    }
    const handleClick = (e) =>{
        console.log("true")
    }
    const handleEdit = (e) =>{
        window.location.href = `/edit/${props.post.id}`
    }
    const handleDeletePost = (e) =>{
        console.log("delete")
        deletePost(props.post.id).then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("refresh token")
                        deletePost(props.post.id).then((response)=>{
                            if (response.status === 204){
                                window.location.reload();
                                window.location.href = '/profile'; 
                            }
                            else if (response.status === 401){
                                console.log("not authenticated")
                                localStorage.removeItem("refresh_token")
                                window.location.reload();
                                window.location.href = '/login'; 
                            }
                            else{
                                toast.error('something went wrong');
                            }
                        })
                    }
                })
            }else if(response.status === 204){
                // window.location.reload();
                // window.location.href = '/profile'; 
                navigate('/profile')
            }else{
                toast.error('something went wrong');
            }
            console.log(response)
        })
        Team13DeletePost(props.post.id).then((response=>{
            console.log(response)
            if (response.status === 400){
                console.log('post not deleted on their end')
            } 
            else{
                console.log('post deleted')
            }
        }))

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
                            else if (response.status === 401){
                                console.log("not authenticated")
                                localStorage.removeItem("refresh_token")
                                window.location.reload();
                                window.location.href = '/login'; 
                            }
                            else if (response.status === 202)
                            decrementLikes()
                            
                            else{
                                console.log(response)
                            }

                            console.log(response)
                        })
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                        
                    }
                })
            }else if (response.status === 201)
                incrementLikes()
            else if (response.status === 202)
                decrementLikes()
            console.log(response)
        })
        console.log(props.post.id)
    }
    const handleShare = (e) =>{
        console.log('share')
    }

    let extraContent = (
    <div>
        <IconButton onClick={handleLike} size="small" color="secondary">
            <Favorite/>
        </IconButton>
        {likes}
    </div>
    ) 
    if ('' + authorID === localStorage.getItem("username")){
        
        extraContent = (    
        <div className='card1'>
            <div className='box2'>
            <div>
                <IconButton onClick={handleLike} size="small" color="secondary">
                    <Favorite/>
                </IconButton>
                {likes}
            </div>
            
            <div>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDeletePost}>Delete</Button>
            </div>
            </div>
        </div>)
    }else{
        extraContent = (    
            <div className='card1'>
                <div className='box2'>
                <div>
                    <IconButton onClick={handleLike} size="small" color="secondary">
                        <Favorite/>
                    </IconButton>
                    {likes}
                </div>
                
                <div>
                    <Button onClick={handleShare}>Share</Button>
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
                            description: {props.post.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Author: <Box fontWeight='bold' display='inline'>{authorID}</Box>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.post.published}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                {extraContent}

            </Card>

        </Box>

    )
}

export default PostViewCard;