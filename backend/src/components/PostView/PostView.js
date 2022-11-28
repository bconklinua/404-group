import React, {useState, useEffect} from 'react'
import { NavLink, resolvePath, useNavigate, useParams } from "react-router-dom";
import { test, getInbox, getPost } from '../../api/Post';
import { getToken, refreshToken, validJWT } from '../../api/User';
import './PostView.css'
import no_img from './no-image-icon-4.png';
import { getPostByID } from '../../api/Post';
// import { getPostByID } from '../../api/PostViewMethods';
import '../../404-page.css'
import { CardMedia, Box, Card } from '@mui/material';
import PostCard from '../Post/PostCard';
import PostViewCard from './PostViewCard';
import Comments from './Comment';
import { postComment } from '../../api/Comments';
import { useLocation } from 'react-router-dom';
import { Team13GetPost } from '../../api/Remote13';
import { toast } from 'react-toastify';
import { Team19GetPost } from '../../api/Remote19';


export default function PostView() {

    // check if post belongs to user who is someone u folllow
    // ...
    const {post_id} = useParams();
    const location = useLocation();
    console.log(location)
    const [postContent, setPostContent] = useState({
        data: null,
    })
    const [comment, setComment] = useState(null)
    const TestPostID = () => {
        
        return (
            <h1> post_id: { post_id } </h1>
        );
    };
    useEffect(()=>{
        setPostContent({
            data: null,
        })
        if (location.state.host === 'https://true-friends-404.herokuapp.com'){
            getPostByID(post_id).then((response)=>{
                if (response.status === 401) {
                    refreshToken().then((response)=>{
                        if (response.status === 200) {
                            console.log("got a post")
                            console.log(response.status)
                            getPostByID(post_id).then((response)=>{
                                if (response.status === 200){
                                    setPostContent({
                                        data: response.data,
                                    })
                                }
                                console.log("...");
                            })
                        }
                        else {
                            window.location.reload();
                            window.location.href = '/login';
                        }
                    })
                } else if (response.status === 200) {
                    setPostContent({
                        data: response.data,
                    })
                } else if (response.status === 404) {
                    setPostContent({
                        data: "404"
                    })
                    console.log('404')
                    window.location.reload();
                    window.location.href='/page-not-found';
                }
            })
        }else if (location.state.origin === 'https://cmput404-team13.herokuapp.com/'){
            Team13GetPost(location.state.author, location.state.id).then((response) => {
                if (response.status === 200){
                    console.log('posts')
                    console.log(response)
                    setPostContent({
                        data: response.data,
                    })
                }
                else{
                    toast.error("Error Loading Post")
                }

            })

        }else{
            var urlID_author = location.state.author.id.split('/');
            var id_author = urlID_author[urlID_author.length - 1];
            var urlID_post = location.state.id.split('/');
            var id_post = urlID_post[urlID_post.length - 1];
            Team19GetPost(id_author, id_post).then((response) => {
                if (response.status === 200){
                    console.log('posts')
                    console.log(response)
                    setPostContent({
                        data: response.data,
                    })
                }
                else{
                    toast.error("Error Loading Post")
                }

            }) 
        }

    }, [])
    const PostContent = () => {
        const {post_id} = useParams();
        const [postContent, setPostContent] = useState({
            data: null,

        })

    }
    let content = null;
    console.log(postContent.data);
    if (postContent.data) {
        if (postContent.data === "404") {
            content = (<h1 classname="no-content">Post does not Exist</h1>)
        }

        else{
            console.log(postContent.data.image)
            content = (<PostViewCard post={postContent.data}/>)
        }
    }

        
    console.log(postContent)
    
    


    
    const validatePost = ({ check404}) => {
        if (check404 === "404") {
            console.log("validate post gave 404")
        }

    }



    return (
        <div>
            <h1 className='profileName'>PostView</h1>
            {content}

                
            <Comments id={post_id} object={location.state} />
                

            {/* <TestPostID /> */}
            {/* <PostContent /> */}
        </div>
        
    )
}
