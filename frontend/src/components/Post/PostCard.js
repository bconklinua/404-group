import React from 'react'
import './ProfileCard.css'

const PostCard = (props) => {

    return (
        <div className='card'>
            <div className='box1'>
                {props.post.title}<br/>
                {props.post.content}
            </div>
        </div>
    )
}

export default PostCard;