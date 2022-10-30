import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import PostView from './components/PostView/PostView';

function App() {
  return (
    <Router>
     <nav className='text-center'>
       <Link to="/login">Login </Link>
       <Link to="/register">Register </Link>
       <Link to="/home">Home </Link>

     </nav>
     <Routes>
       <Route path="/login"element={<Login/>}/>
       <Route path="/register"element={<Register/>}/>
       <Route path="/home"element={<Home/>}/>
       <Route path="/posts/:post_id"element={<PostView/>}/>

     </Routes>
     
    </Router>

  );
}

export default App;
