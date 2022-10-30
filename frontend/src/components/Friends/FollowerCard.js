import React from 'react'
import './FollowerCard.css'

const FollowerCard = (props) => {

    return (
        <div>
            {props.follower.sender_username}
        </div>
    )
}

export default FollowerCard;