import React from 'react'
import './ProfileCard.css'

const FollowerCard = (props) => {

    return (
        <div className='card'>
            <div className='box1'>
                {props.follower.sender_username}
            </div>
        </div>
    )
}

export default FollowerCard;