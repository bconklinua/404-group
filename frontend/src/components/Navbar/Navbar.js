import react from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='nav'>
            <div className='container'>
                <h3 className='TrueFriends'>True Friends</h3>
                <ul className='navLinks'>
                    <Link to='/home' className="link"><li>Home</li></Link>
                    <Link to='/post' className="link"><li>Post</li></Link>
                    <Link to='/register' className="link"><li>Inbox</li></Link>
                    <Link to='/friends' className="link"><li>Friends</li></Link>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;