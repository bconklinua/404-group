import react, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { getFollowers } from '../../api/Friends'
import { refreshToken, getAllUsers } from '../../api/User'
import Team10Card from './Team10Card'
import { Team10GetAuthors } from '../../api/Remote10'

const Team10 = () => {
    const [users, setUsers] = useState({
        data: null,
    })
    useEffect(()=>{
        setUsers({
            data: null,
        })
        Team10GetAuthors().then((response)=>{
            console.log("team10")
            console.log(response)
            if (response.status === 200){
                console.log(response.data)
                setUsers({
                    data: response.data.items,
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

            <Team10Card user={user}/>

            )
        }
    }

    return (
        <div>
            {content}
        </div>
    )
}
export default Team10;