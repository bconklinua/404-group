import react, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { getFollowers } from '../../api/Friends'
import { refreshToken, getAllUsers } from '../../api/User'
import Team19Card from './Team9Card'

const Team19 = () => {
    const [users, setUsers] = useState({
        data: null,
    })
    useEffect(()=>{
        setUsers({
            data: null,
        })
        getAllUsers().then((response)=>{
            if (response.status === 401){
                refreshToken().then((response)=>{
                    if (response.status === 200){
                        console.log("refresh token")
                        console.log(response.status)
                        getAllUsers().then((response)=>{
                            if (response.status === 200){
                                setUsers({
                                    data: response.data,
                                })
                            }
                            else{
                                console.log("not authenticated")
                                localStorage.removeItem("refresh_token")
                                window.location.reload();
                                window.location.href = '/login'; 
                            }

                        })
                    }
                    else{
                        window.location.reload();
                        window.location.href = '/login';
                        
                    }
                })
            }else if (response.status === 200){
                setUsers({
                    data: response.data,
                })
            }
        })
    }, [])

    let content = null;
    console.log(users.data)
    if (users.data){
        if (users.data.length === 0){
            content = (<div className="none">No Users</div>)
        }
        else{
            content = users.data.map((user, key)=>

            <Team19Card user={user}/>

            )
        }
    }

    return (
        <div>
            {content}
        </div>
    )
}
export default Team19;