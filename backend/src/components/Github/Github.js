import axios from 'axios'
const Github = () =>{
    axios.get('https://github.com/users/JoshuaN18/events', {

    }).then((response)=>{
        console.log(response)
    })

    return (
        <h1>Github</h1>
    )
}

export default Github;