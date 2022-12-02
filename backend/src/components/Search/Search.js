
import Team10 from '../Explore/Team10'
import SearchCard from './SearchCard'
import react, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../api/api'
import { Box, TextField, LinearProgress, Stack, CircularProgress} from '@mui/material'

const Search = () =>{
    const [users, setUsers] = useState({
        data: null,
        loading: true,
    })
    const [search, setSearch] = useState('')
    useEffect(()=>{

        const fetchData = async () => {
            //const team10 = await axios.get('https://socioecon.herokuapp.com/authors/')
            const team13 = await axios.get('https://cmput404-team13.herokuapp.com/authors?page=1&size=1000000')
            const team12 = await axios.get(`${BASE_URL}/authors/`, {
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*",
                    Authorization: `JWT ${localStorage.getItem("access_token")}`
                }
            })
            const team19 = await axios.get('https://social-distribution-404.herokuapp.com/authors', {        
                auth: {
                    username: 'team12',
                    password: '96%fmA54'
                },
                headers:{
                    "Content-Type": "application/json",
        
                }
            })
            //console.log(team10.data)
            console.log(team12.data)
            console.log(team13.data)
            console.log(team19.data)
            const children = team12.data.concat(team13.data.authorsPage, /*team10.data.items,*/ team19.data.items);
            setUsers({data: children, loading: false})
        }
        fetchData();
    }, [])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    let content = ( <Box display="flex" justifyContent="center" alignItems="center" sx={{ display: 'flex', color: 'grey.500' }}>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <CircularProgress size="7rem" color="inherit"/>
                    </Box>)

    if (users.data){
        if (users.data.length === 0){
            content = (<div className="none">No Users</div>)
        }
        else{
            content = users.data.filter((item)=>{
                if (search === ''){
                    return item
                }else if (search === 'team 10'){
                    return item
                }else if (search === 'team 12'){
                    return item.host.toLowerCase().includes("https://true-friends-404.herokuapp.com")
                }else if (search === 'team 13'){
                    return item.host.toLowerCase().includes("https://cmput404-team13.herokuapp.com")
                }else if (search === 'team 19'){
                    return item.host.toLowerCase().includes("https://social-distribution-404.herokuapp.com/")
                }
                else{
                    if (item.displayName !== undefined){
                        return item.displayName.toLowerCase().includes(search)
                    }else{
                        return item.username.toLowerCase().includes(search)
                    }

                }

            }).map((user, key)=>

            <SearchCard user={user}/>

            )
        }
    }
    return (

        <div>
            <br/>
            <Box display="flex" justifyContent="center" alignItems="center"
            sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
            }}
            >      
            <TextField
                sx={{ width: '50%' }}
                id="text"
                label="Search"
                onChange={handleSearch}
            />
            </Box>
            {content}
        </div>
    )
}

export default Search