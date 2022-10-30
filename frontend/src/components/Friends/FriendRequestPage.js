import React from 'react'
import react, { useEffect, useState } from 'react'
import { getFriendRequests } from '../../api/Friends'
import { refreshToken } from '../../api/User'

const FriendRequestPage = () => {
    const [Requests, setRequests] = useState({
        data: null,
    })
    useEffect(()=>{
        setRequests({
            data: null,
        })
        getFriendRequests().then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("success")
                        console.log(response.status)
                        getFriendRequests().then((response)=>{
                            if (response.status === 200){
                                setRequests({
                                    data: response.data,
                                })
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
                setRequests({
                    data: response.data,
                })
            }
        })
    }, [])

    let content = null;
    console.log(Requests.data)
    if (Requests.data){
        content = Requests.data.map((request, key)=>
            <div>
                {request.sender_username}
            </div>
        )
        
    }

    return (
        <div>
            <h1>Friend Requests</h1>
            {content}
        </div>
    )
}

export default FriendRequestPage