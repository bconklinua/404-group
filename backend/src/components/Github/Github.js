import axios from 'axios'
const Github = () =>{
    axios.get('https://api.github.com/users/JoshuaN18/events?page=1&size=50', {

    }).then((response)=>{
        console.log(response)
    })

    return (
        <h1>Github</h1>
    )
}

export default Github;