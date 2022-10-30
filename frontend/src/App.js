import './App.css';
import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';
import  { Navigate } from 'react-router-dom'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Welcome from './components/Home/Welcome';
import { isAuthenticated } from './api/User';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [info, setInfo] = useState({
    login: localStorage.getItem("refresh_token"),
  })
  console.log(info.login)
  // render={() => (isAuthenticated () ? (<Navigate to="/login"/>) : (<Home />))}


  const goLogin = (e) =>{
    window.location.href="/login"
  }
  const goRegister = (e) =>{
      window.location.href="/register"
  }

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
       <Route path="/login"element={<Login/>}/>
       <Route path="/register"element={<Register/>}/>

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

  return (render)

}

export default App;
