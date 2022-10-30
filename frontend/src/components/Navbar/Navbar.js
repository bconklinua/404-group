import react from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='nav'>
            <div className='container'>
                <h3 className='TrueFriends'>True Friends</h3>
                <ul className='navLinks'>
                    <Link to='/home'><li>Home</li></Link>
                    <Link to='/login'><li>Post</li></Link>
                    <Link to='/register'><li>Inbox</li></Link>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;