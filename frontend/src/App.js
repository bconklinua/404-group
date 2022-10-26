import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <body className='text-white'>
    <Router>
     <nav className='text-center'>
       <Link to="/login">Login </Link>

     </nav>
     <Routes>
       <Route path="/login"element={<Login/>}/>

     </Routes>
     
    </Router>
   </body>
  );
}

export default App;
