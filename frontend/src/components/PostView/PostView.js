import React, {useState, useEffect} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { test, getInbox, getPost } from '../../api/Post';
import { getToken, validJWT } from '../../api/User';
import './PostView.css'
import no_img from './no-image-icon-4.png';
import { stripBasename } from '@remix-run/router';
// import { getPostByID } from '../../api/PostViewMethods';



export default function PostView() {

    // check if post belongs to user who is someone u folllow
    // ...

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
            </form>
            
        )
    }

    




    return (
        <div>
            <div className='postview-header'>
                <h1 className='postview-title'>PostView</h1>
            </div>
            <div className='postview-main'>
                <img class="no-post-img" src={no_img} alt="No logo" />
                <CommentForm />
                
            </div>
        </div>
        
    )
}




// const PostView  = () =>{


//     return(
//         <main>
//             <h1>Viewing Post</h1>

//         </main>

//     );
    
// }

// export default PostView


