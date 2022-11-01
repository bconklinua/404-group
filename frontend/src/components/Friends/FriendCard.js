import React from 'react'
import './ProfileCard.css'

const FriendCard = (props) => {

    return (
        <div className='card'>
            <div className='box1'>
                {props.friend.friend_username}
            </div>
        </div>
    )
}

export default FriendCard;