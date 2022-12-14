import React, {useState}from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Favorite from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Box, Button, CardActionArea, Divider } from '@mui/material';
import { doLike } from '../../api/Likes';
import { refreshToken } from '../../api/User';
import PostView from '../PostView/PostView';
import { deletePost } from '../../api/Post';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../api/api';
import { Team13DeletePost } from '../../api/Remote13';
import { useNavigate } from "react-router-dom";
import { Team13AddLike, Team13DeleteLike } from '../../api/Remote13';
import ReactMarkdown from 'react-markdown'
import { Team19DeletePost, Team19Like } from '../../api/Remote19';
import { Team10Like } from '../../api/Remote10';

const PostViewCard = (props) => {
    const navigate = useNavigate();
    let content = null
    let imageContent = null
    var authorID = props.post.author
    console.log("postview")
    console.log(props.post.author)
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

        console.log("image url being called")
        imageContent = (<CardMedia height="20%" component='img' image={props.post.image_url}/>)
    }
    else if (props.post.image){
        
        console.log("props.post.image")
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
        console.log("just content being called")
        console.log(props.post.host)
        
        
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
        navigate(`/edit/${props.post.id}`)
        //window.location.href = `/edit/${props.post.id}`
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
                navigate('/home')
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
        // Team19DeletePost(props.post.id).then((response)=>{
        //     console.log('team 19 delete post')
        //     console.log(response)
        // })
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
            }
            else if (response.status === 201){
                console.log("test 1")
                console.log(response)
                incrementLikes()
                if (response.data.post.host.includes('https://cmput404-team13.herokuapp.com') || response.data.post.origin.includes('https://cmput404-team13.herokuapp.com')){
                    Team13AddLike("nothing", props.post.id).then((response)=>{
                        console.log("team13 like")
                        console.log(response)
                    })
                }
                else if (response.data.post.host.includes('https://social-distribution-404.herokuapp.com') || response.data.post.origin.includes('https://social-distribution-404.herokuapp.com')){
                    console.log("send a like to team 19")
                    let object = `https://social-distribution-404.herokuapp.com/authors/${props.post.author.id}/posts/${props.post.id}`
                    let summary = `${localStorage.getItem('username')} likes your post titled ${props.post.title}`
                    Team19Like(summary, object, props.post.author.id).then((response)=>{
                        console.log("team19 like post")
                        console.log(response)
                    })
                }else if (response.data.post.host.includes('https://socioecon.herokuapp.com') || response.data.post.origin.includes('https://socioecon.herokuapp.com')){
                    Team10Like(props.post.author.id, `authors/${props.post.author.id}/posts/${props.post.id}`).then((response)=>{
                        console.log('team 19 like post')
                        console.log(response)
                    })
                }
                
            }
            else if (response.status === 202){
                console.log("test 2")
                console.log(response)
                decrementLikes()
                if (response.data.post.host.includes('https://cmput404-team13.herokuapp.com') || response.data.post.origin.includes('https://cmput404-team13.herokuapp.com')){
                    Team13DeleteLike("nothing", props.post.id).then((response)=>{
                        console.log("team19 like okok")
                        console.log(response)
                    })
                }
                // else if (response.data.team19_followers === true){
                //     console.log("remove displike team 19")

                // }
            }else if (response.status === 403){
                toast.error("cannot like foreign posts that you do not follow")
            }else{
                toast.error("failed to like")
            }
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
    if ('' + authorID === localStorage.getItem("authorID")){
        
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
                
                {/* <div>
                    <Button onClick={handleShare}>Share</Button>
                </div> */}
                </div>
            </div>)   
    }


    let originalAuthor = null
    if (props.post.original_author){
        originalAuthor = (                        
        <Typography variant="body2" color="text.secondary">
        Original Author: <Box fontWeight='bold' display='inline'>{props.post.original_author}</Box>
        </Typography>)
    }
    return (

        <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={2} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>

            <Card sx={{ minWidth:500, maxWidth: 1000 }}>
                <CardActionArea onClick={handleClick}>
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
                        {originalAuthor}
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