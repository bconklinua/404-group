import axios from 'axios'
import { CircularProgress, Box } from '@mui/material';
import GithubCard from './GithubCard';
import React from 'react'
import { toast } from 'react-toastify';
import './github.css'

const Github = () =>{
    const [github, setGithub] = React.useState({
        page: 1,
        data: null
    })

    var githubUsername = localStorage.getItem('github')
    if (typeof githubUsername === 'string'){
        var parseGithub = githubUsername.split('/')
        if (localStorage.getItem('github').endsWith('/') === true){
            var githubUsername = parseGithub[parseGithub.length -2]
        }else{
            var githubUsername = parseGithub[parseGithub.length -1]
        }
        
    }
    React.useEffect(()=>{
        axios.get(`https://api.github.com/users/${githubUsername}/events?page=1&per_page=10`, {

        }).then((response)=>{
            console.log(response)
            if (response.status === 200){
                
                setGithub({page: github.page+1, data: response.data})
            }else{
                toast.warn('Git a github bro')
            }
        }).catch((response)=>{
            toast.warn('Git a github bro')
            setGithub({data: []})
        })
    
    }, [])


    const loadMore = (e) =>{
        axios.get(`https://api.github.com/users/${githubUsername}/events?page=${github.page}&per_page=20`, {

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

    let moreButton = null

    if (github.data){
        if (github.data.length === 0){
            content = (<div className="none">Git Github Bro</div>)
        }
        else{
            console.log(github.data)
            content = github.data.map((github, key)=>
            
            <GithubCard github={github}/>

            )
            moreButton = (
                <center>    
                    <button
                        className="more"
                        onClick={loadMore}
                        >
                        Load More
                    </button>
                </center>
            )
        }
    }
    return (
        
        <div>
        {content}
        {moreButton}

        </div>
    )
}

export default Github;