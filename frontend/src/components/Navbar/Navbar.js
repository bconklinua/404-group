import react from 'react'
import './Navbar.css'
import {NavLink} from 'react-router-dom'


const Navbar = () => {
    return (
        <nav className='nav'>
            <div className='container'>
                <h3 className='TrueFriends'>True Friends</h3>
                <ul className='navLinks'>
                    <NavLink to='/home' className="link" activeClassName="active"><li>Home</li></NavLink>
                    <NavLink to='/post' className="link" activeClassName="active" ><li>Post</li></NavLink>
                    <NavLink to='/register' className="link" activeClassName="active"><li>Inbox</li></NavLink>
                    <NavLink to='/profile' className="link" activeClassName="active"><li>Profile</li></NavLink>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;