import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
     <nav className='text-center'>
       <Link to="/login">Login </Link>
       <Link to="/register">Register </Link>

     </nav>
     <Routes>
       <Route path="/login"element={<Login/>}/>
       <Route path="/register"element={<Register/>}/>

     </Routes>
     
    </Router>

  );
}

export default App;
