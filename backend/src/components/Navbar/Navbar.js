import react from 'react'
import './Navbar.css'
import {NavLink} from 'react-router-dom'


const Navbar = () => {
    return (
        <nav className='nav'>
            <div className='container'>
                <h3 className='TrueFriends'>True Friends</h3>
                <ul className='navLinks'>
                    <NavLink to='/home' className="link"><li>Home</li></NavLink>
                    <NavLink to='/post' className="link"><li>Post</li></NavLink>
                    <NavLink to='/inbox' className="link"><li>Inbox</li></NavLink>
                    <NavLink to='/profile' className="link"><li>Profile</li></NavLink>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;