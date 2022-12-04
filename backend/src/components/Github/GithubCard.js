import react, { useState, useEffect } from 'react'

import {Box, Tab, Card, CardContent, Typography, Avatar, Grid, Button} from '@mui/material'
import '../Profile/Profile.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'


const GithubCard = (props) =>{

    return (
        <main>
            <div>
            <Box display="flex" justifyContent="center" alignItems="center" flex={4} p={2} sx={{ flexWrap: 'wrap', margin: 'auto'}} margin='auto'>
            <Card sx={{ minWidth:500, maxWidth: 500 }}>
            <CardContent>

                <Box justifyContent="center" alignItems="center" p={2}>
                <Typography gutterBottom variant="h5" component="div">
                    {props.github.type}
                </Typography>
                <Typography variant="body2">
                    Repo: {props.github.repo.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Date: {props.github.created_at}
                </Typography>

                </Box>
                
            </CardContent>
            </Card>
            </Box>

            </div>
        </main>
    )

}
export default GithubCard