import React from 'react'
import react, { useEffect, useState } from 'react'
import { getFriendRequests } from '../../api/Friends'
import { refreshToken } from '../../api/User'
import FriendRequestCard from './FriendRequestCard'

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

    const removeRequest = (name) => {
        setRequests({
            data: Requests.data.filter(el => el !== name)
        })
    }

    let content = null;
    console.log(Requests.data)
    if (Requests.data){
        if (Requests.data.length === 0){
            content = (<div className="none">No Requests</div>)
        }
        else{
            content = Requests.data.map((request, key)=>

            <FriendRequestCard request={request} removeRequest={removeRequest}/>

            )
        }
        
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default FriendRequestPage