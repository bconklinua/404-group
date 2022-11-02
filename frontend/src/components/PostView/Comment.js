import React, {useState, useEffect} from 'react'
import { deletePost } from '../../api/Post';
import { refreshToken, isAuthenticated } from '../../api/User';
import { useNavigate } from "react-router-dom";
import PostCard from "../Post/PostCard";
import CommentCard from './CommentCard'
import { postComment, getComments } from '../../api/Comments';
import { Box, TextField, Divider, Button } from '@mui/material';


const Comments = (props) => {
    const [comments, setComments] = useState({
        data: null,
    })
    useEffect(()=>{
        setComments({
            data: null,
        })
        getComments(props.id).then((response)=>{
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
                console.log(response)
                setComments({
                    data: response.data,
                })
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
            postComment(json).then((response)=>{
                console.log(response.status)
                if (response.status === 401) {
                    refreshToken().then((response)=>{
                        if (response.status === 200) {
                            console.log("refresh token")
                            console.log(response.status)
                            postComment(json).then((response)=>{
                                if (response.status === 201){
                                    comments.data.push(json)
                                    setComments({
                                      data:comments.data  
                                    })
                                }else if (response.status === 401){
                                    console.log("not authenticated")
                                    localStorage.removeItem("refresh_token")
                                    window.location.reload();
                                    window.location.href = '/login'; 
                                }
                                else{
                                    console.log(response)
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
                    comments.data.push(json)
                    setComments({
                      data:comments.data  
                    })
                    
                    console.log(comments.data.slice())
                } else if (response.status === 404) {
                    console.log('404')
                    window.location.reload();
                    window.location.href='/page-not-found';
                }
            })
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
            content = (<div className="none">No Comments</div>)
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