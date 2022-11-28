import './App.css';
import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';
import  { Navigate } from 'react-router-dom'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import PostView from './components/PostView/PostView';
import PostPost from './components/Post/PostPost';
import Profile from './components/Profile/Profile';
import FriendRequestPage from './components/Friends/FriendRequestPage';
import Welcome from './components/Home/Welcome';
import { isAuthenticated } from './api/User';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import PageNotFound from './404-page';
import Inbox from './components/Inbox/Inbox';
import UserView from './components/UserView/UserView';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import EditPost from './components/Post/EditPost';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
function App() {
  const [info, setInfo] = useState({
    login: localStorage.getItem("refresh_token"),
  })
  console.log(info.login)
  // render={() => (isAuthenticated () ? (<Navigate to="/login"/>) : (<Home />))}


  // const goLogin = (e) =>{
  //   window.location.href="/login"
  // }
  // const goRegister = (e) =>{
  //     window.location.href="/register"
  // }

  let render = (info.login != null) ? (


    <Router>
     {/* <nav className='text-center'>
       <Link to="/login">Login </Link>
       <Link to="/register">Register </Link>
       <Link to="/">Home </Link>


     </nav> */}

     <Navbar/>
     
     <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/post" element={<PostPost/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/post/:post_id/"element={<PostView/>}/>
        <Route path="/user/:user_id/:username/:team"element={<UserView/>}/>
        <Route path="/inbox"element={<Inbox/>}/>
        <Route path="/page-not-found"element={<PageNotFound/>}/>
        <Route path="/edit/:post_id" element={<EditPost/>}/>


     </Routes>
     
    </Router>


  ) :(

    <Router>

     <Routes>
        <Route path="/"element={<Login/>}/>
        <Route path="/login"element={<Login/>}/>
        <Route path="/register"element={<Register/>}/>

     </Routes>
     
    </Router>

  )

  return (<div><ToastContainer position="top-center"/>{render}</div>)

}

export default App;
