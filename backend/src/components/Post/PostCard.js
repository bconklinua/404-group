import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Favorite from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Box, Button, CardActionArea, Divider } from '@mui/material';
import './PostCard.css'
import { doLike } from '../../api/Likes';
import { refreshToken } from '../../api/User';
import PostView from '../PostView/PostView';
import { BASE_URL } from '../../api/api';
import { useNavigate } from "react-router-dom";
import { Team13AddLike, Team13DeleteLike } from '../../api/Remote13';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown'
import { Team19Like } from '../../api/Remote19';

const PostCard = (props) => {
    const navigate = useNavigate();
    let content = null
    let imageContent = null
    var authorID = props.post.author
    var displayName = props.post.author
    if (typeof props.post.author === 'string') {
        
    }else{
        var urlID = props.post.author.id.split('/');
        var id = urlID[urlID.length - 1];
        authorID = id
        if (props.post.author.displayName){
            displayName = props.post.author.displayName
        }
        else{
            displayName = props.post.author.username
        }
    }

    if (props.post.image_url != "" && props.post.image_url != undefined){


        imageContent = (<CardMedia height="20%" component='img' image={props.post.image_url}/>)
    }
    else if (props.post.image){
        

        let imgurl = `${BASE_URL}${props.post.image}`
        imageContent = (
            <CardMedia height="20%" component='img' image={imgurl}/>
            // <img src={imgurl} alt="Girl in a jacket" ></img>
        )
    }else{
        if (props.post.host === "https://true-friends-404.herokuapp.com"){
            //var contentStuff = props.post.content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
            //console.log(contentStuff)
            //content = (<h4 id="content">{contentStuff}</h4>)
            if (props.post.contentType === 'text/markdown'){
                 content = (<div><Typography><ReactMarkdown>{props.post.content}</ReactMarkdown><Divider/></Typography></div>)
            }else{
                content = (<div><pre>{props.post.content}</pre><Divider/></div>)
            }
            
        }

        else {
            if (props.post.contentType === 'image'){
                imageContent = (<CardMedia height="20%" component='img' image={props.post.content}/>)
                
            }else if (props.post.contentType === 'text/markdown'){
                content = (<div><Typography><ReactMarkdown>{props.post.content}</ReactMarkdown><Divider/></Typography></div>)
            }
            else{
                // var contentStuff = props.post.content
                // contentStuff =  contentStuff.replace(/(?:\r\n|\r|\n)/g, '<br/>');
                content = (<div><Typography><pre>{props.post.content}</pre></Typography><Divider/></div>)

            }
            
        }

    } 

    const handleClick = (e) =>{
        //window.location.href = `/post/${props.post.id}`
        var urlID = props.post.id.split('/');
        var id = urlID[urlID.length - 1];
        console.log("abcdef")
        console.log(props.post)
        navigate(`/post/${id}`, {state: props.post});
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
                console.log("test 1")
                console.log(response)
                incrementLikes()

                if (response.data.team13_followers === true || response.data.team13_followers === undefined){
                    Team13AddLike("nothing", props.post.id).then((response)=>{
                        console.log("team13 like")
                        console.log(response)
                    })
                }
                if (response.data.team19_followers === true || response.data.team19_followers === undefined){
                    console.log("send a like to team 19")
                    let object = `https://social-distribution-404.herokuapp.com/authors/${props.post.author.id}/posts/${props.post.id}`
                    let summary = `${localStorage.getItem('username')} likes your post titled ${props.post.title}`
                    Team19Like(summary, object, props.post.author.id).then((response)=>{
                        console.log("team19 like post")
                        console.log(response)
                    })
                }
                
            }
            else if (response.status === 202){
                console.log("test 2")
                console.log(response)
                decrementLikes()
                if (response.data.team13_followers === true || response.data.team13_followers === undefined){
                    Team13DeleteLike("nothing", props.post.id).then((response)=>{
                        console.log("team19 like okok")
                        console.log(response)
                    })
                }
                if (response.data.team19_followers === true){
                    console.log("remove displike team 19")

                }
            }else if (response.status === 403){
                toast.error("cannot like foreign posts that you do not follow")
            }else{
                toast.error("failed to like")
            }
        })
        console.log(props.post.id)
    }

    const handleShare = (e) =>{
        toast.success("shared")
        console.log(props)
    }

    let extraContent = (
        <div>
            <IconButton onClick={handleLike} size="small" color="secondary">
                <Favorite/>
            </IconButton>
            {likes}
        </div>
        )

        if ('' + authorID === localStorage.getItem("authorID")){
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

            <Card sx={{ minWidth:500, maxWidth: 500 }}>
                <CardActionArea onClick={handleClick}>
                    <h4 id="content"></h4>

                    
                    {imageContent}
                    <CardContent>
                        {content}
                        <Typography gutterBottom variant="h5" component="div">
                            {props.post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            description: {props.post.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Author: <Box fontWeight='bold' display='inline'>{displayName}</Box>
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

export default PostCard;