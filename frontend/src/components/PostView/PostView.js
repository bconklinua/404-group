import React, {useState, useEffect} from 'react'
import { NavLink, resolvePath, useNavigate, useParams } from "react-router-dom";
import { test, getInbox, getPost } from '../../api/Post';
import { getToken, validJWT } from '../../api/User';
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
        var [post_content, set_post_content] = useState("")

        const PostContent = () => {
            const {post_id} = useParams();
            const [post_content, set_post_content] = useState("")

            getPostByID(post_id).then((response) => {
                console.log(response.data)
                //set_post_content(response.data);
            })
            // set_post_content = getPostByID(post_id);
            // console.log(set_post_content)
            console.log("PostContent");
            // console.log(post_content.data);

            return (
                <p>post_content: {post_content.data}</p>
            );
        }
    
    


    function CommentForm() {
        const [comment, setComment] = useState("");

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(`Form submitted, ${comment}`);
        }



        return (
            <form onSubmit={handleSubmit}>
                <label>Comment:
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
                <button className='comment-submit-button'>Send Comment</button>
                <PostContent/>
            </form>
            
        )
    }

    




    return (
        <div>
            <div className='postview-header'>
                <h1 className='postview-title'>PostView</h1>
            </div>
            <div className='postview-main'>
                <img className="no-post-img" src={no_img} alt="No logo" />
                <CommentForm />
                
            </div>
            <TestPostID />
            {/* <PostContent /> */}
        </div>
        
    )
}
