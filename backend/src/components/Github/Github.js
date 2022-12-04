import axios from 'axios'
import { CircularProgress, Box } from '@mui/material';
import GithubCard from './GithubCard';
import React from 'react'

const Github = () =>{
    const [github, setGithub] = React.useState({
        page: 1,
        data: null
    })
    React.useEffect(()=>{
        axios.get(`https://api.github.com/users/JoshuaN18/events?page=1&per_page=20`, {

        }).then((response)=>{
            console.log(response)
            if (response.status === 200){
                
                setGithub({page: github.page+1, data: response.data})
            }
        })
    
    }, [])


    const loadMore = (e) =>{
        axios.get(`https://api.github.com/users/JoshuaN18/events?page=${github.page}&per_page=20`, {

        }).then((response)=>{
            console.log(response)
            if (response.status === 200){
                setGithub({data: [...github.data, ...response.data], page: github.page+1})
            }
        })
    }


    let content = ( 
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ display: 'flex', color: 'grey.500' }}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        <CircularProgress size="7rem" color="inherit"/>
        </Box>)

    if (github.data){
        if (github.data.length === 0){
            content = (<div className="none">No github</div>)
        }
        else{
            console.log(github.data)
            content = github.data.map((github, key)=>
            
            <GithubCard github={github}/>

            )
        }
    }
    return (
        
        <div>
        {content}
        <center>    
            <button
                className="btn btn-light btn-block w-50 mx-auto"
                onClick={loadMore}
                >
                Load More Users
            </button>
        </center>

        </div>
    )
}

export default Github;