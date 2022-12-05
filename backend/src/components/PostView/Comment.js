import React, {useState, useEffect} from 'react'
import { deletePost } from '../../api/Post';
import { refreshToken, isAuthenticated } from '../../api/User';
import { useNavigate } from "react-router-dom";
import PostCard from "../Post/PostCard";
import CommentCard from './CommentCard'
import { postComment, getComments } from '../../api/Comments';
import { Box, TextField, Divider, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Team13GetComments, Team13PostComment } from '../../api/Remote13';


const Comments = (props) => {
    const [comments, setComments] = useState({
        data: null,
    })
    useEffect(()=>{
        setComments({
            data: null,
        })
       
        getComments(props.id).then((response)=>{
            if (props.object.host === 'https://true-friends-404.herokuapp.com'){
                if (response.status === 401){
                    refreshToken().then((response)=>{
                        if (response.status === 200){
                            console.log("success")
                            console.log(response.status)
                            getComments(props.id).then((response)=>{
                                if (response.status === 200){
                                    setComments({
                                        data: response.data,
                                    })
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
                    console.log("comments")
                    console.log(response)
                    setComments({
                        data: response.data,
                    })
                }   
            }else if (props.object.host === "https://cmput404-team13.herokuapp.com" || props.object.origin === "https://cmput404-team13.herokuapp.com"){
                Team13GetComments(props.object.author, props.object.id).then((response)=>{
                    console.log("team13 comments")
                    console.log(response)
                    if (response.status === 200){
                        
                        setComments({
                            data: response.data,
                        })
                    }
                    else{
                        toast.error("Error Loading comments")
                    }


                })

            }else{
                console.log("no comments")
                console.log(props.object)
            }

        })
        
    }, [])

    function CommentForm() {
        const [comment, setComment] = useState("");

        const handleSubmit = (e) => {
            e.preventDefault();
            const data = new FormData(e.target)
            const json = Object.fromEntries(data.entries())
            json["post_id"] = props.id
            json["author"] = localStorage.getItem("username")
            console.log("comment post view")
            console.log(props)
            if (props.object.host === "https://cmput404-team13.herokuapp.com" || props.object.origin === "https://cmput404-team13.herokuapp.com"){
                toast.info('called')
                Team13PostComment(json, "", props.id).then((response)=>{
                    if (response.status === 200){
                        toast.info('team 13 sent')
                        console.log("team13 comment")
                        console.log(response)
                        comments.data.push(json)
                        setComments({
                        data:comments.data  
                        })
                    }
                    else{
                        toast.error('Oh no something terrible happened')
                    }

                })
            }else if (props.object.host === "https://true-friends-404.herokuapp.com"){

                postComment(json).then((response)=>{
                    console.log(response.status)
                    if (response.status === 401) {
                        refreshToken().then((response)=>{
                            if (response.status === 200) {
                                console.log("refresh token")
                                console.log(response.status)
                                postComment(json).then((response)=>{
                                    if (response.status === 201){
                                        comments.data.push(response.data)
                                        setComments({
                                        data:comments.data  
                                        })
                                        toast.success("comment posted")
                                    }else if (response.status === 401){
                                        console.log("not authenticated")
                                        localStorage.removeItem("refresh_token")
                                        window.location.reload();
                                        window.location.href = '/login'; 
                                    }
                                    else{
                                        toast.error("comment NOT posted")
                                    }
                                    console.log("...");
                                })
                            }
                            else {
                                window.location.reload();
                                window.location.href = '/login';
                            }
                        })
                    } else if (response.status === 201) {
                        if (response.team13_follower === true){
                            Team13PostComment(response.data, response.data.id, props.id).then((response)=>{
                                console.log("team13 comment")
                                console.log(response)
                            })
                        }else console.log("no team 13")
                        if (response.team19_follower === true){
                            console.log("send team19 the comment")
                        }
                        comments.data.push(response.data)
                        setComments({
                        data:comments.data  
                        })
                        toast.success("comment posted")
                        
                        console.log(comments.data.slice())
                    } else if (response.status === 404) {
                        console.log('404')
                        window.location.reload();
                        window.location.href='/page-not-found';
                    }else{
                        toast.error("comment NOT posted")
                    }
                    console.log("comment response")
                    console.log(response)
                })
            }
        }

        const handleDelete = (e) =>{

        }

        return (
            
            <form onSubmit={handleSubmit}>
                {/* <PostContent/> */}
                {/* <label>Comment:
                    <input
                        type="text"
                        value={comment}
                        name="comment"
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
                <button className='comment-submit-button'>Send Comment</button> */}
                <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={5} sx={{ margin: 'auto', width: 1000, maxWidth: '100%',}}>
                    <TextField fullWidth label="Comment" id="comment" name="comment"/>
                    {/* <button className='comment-submit-button'>Send Comment</button> */}
                    <Button type="submit">Send Comment</Button>
                </Box>
                <Divider />

            </form>
            
        )
    }

    let content = null;
    console.log(comments.data)
    if (comments.data){
        if (comments.data.length === 0){
            content = (<div className="none"><br/><br/>No Comments</div>)
        }
        else{
            // console.log(comments.data[0].type)
            content = comments.data.slice().reverse().map((comment, key)=>
            
            <CommentCard comment={comment}/>
            )
        }
    }

    return (
        <div>
            <CommentForm/>
            {content}
        </div>
    )
}
export default Comments;