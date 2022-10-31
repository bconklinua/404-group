import React, {useState, useEffect} from 'react'
import { NavLink, resolvePath, useNavigate, useParams } from "react-router-dom";
import { test, getInbox, getPost } from '../../api/Post';
import { getToken, refreshToken, validJWT } from '../../api/User';
import './PostView.css'
import no_img from './no-image-icon-4.png';
import { getPostByID } from '../../api/Post';
// import { getPostByID } from '../../api/PostViewMethods';



export default function PostView() {

    // check if post belongs to user who is someone u folllow
    // ...

    const TestPostID = () => {
        const {post_id} = useParams();
        return (
            <h1> post_id: { post_id } </h1>
        );
    };

        const PostContent = () => {
            const {post_id} = useParams();
            const [postContent, setPostContent] = useState({
                data: null,

            })
            useEffect(()=>{
                setPostContent({
                    data: null,
                })
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
                    }
                })
            }, [])


            let content = null;
            console.log(postContent.data);
            if (postContent.data) {
                if (postContent.data === "404") {
                    content = (<h1 classname="no-content">Post does not Exist</h1>)
                }
                else {
                    if (postContent.data.contentType === "text/markdown") {
                        console.log("text markdown");
                    }
                    else if (postContent.data.contentType === "text/plain") {
                        console.log("text plain");
                        content = (
                            <>
                                <h2 classname="post-title">{postContent.data.title}</h2>
                                <p classname="post-content">{postContent.data.content}</p>
                            </>
                            )
                    }
                    else if (postContent.data.contentType === "application/base64") {
                        console.log("app/base64");
                    }
                    else if (postContent.data.contentType === "image/png;base64") {
                        console.log("png;base64");
                        content = (<img classname="no-post-img" src={no_img} alt="pngbase64"></img>)
                    }
                    else if (postContent.data.contentType === "image/jpeg;base64") {
                        console.log("jpeg;base64");
                        content = (<img classname="no-post-img" src={no_img} alt="jpegbase64"></img>)

                    }
                    }
                }
                return content
                }

        

    
    


    function CommentForm() {
        const [comment, setComment] = useState("");

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(`Form submitted, ${comment}`);
        }



        return (
            
            <form onSubmit={handleSubmit}>
                <PostContent/>
                <label>Comment:
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
                <button className='comment-submit-button'>Send Comment</button>
                
            </form>
            
        )
    }

    




    return (
        <div>
            <div className='postview-header'>
                <h1 className='postview-title'>PostView</h1>
            </div>
            <div className='postview-main'>
                <postContent/>
                <CommentForm />
                
            </div>
            <TestPostID />
            {/* <PostContent /> */}
        </div>
        
    )
}
