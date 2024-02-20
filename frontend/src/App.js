import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import Nav from'./components/nav/Nav';
import RegisterPage from './components/registerPage/RegisterPage';


function App() {

   const [token, setToken] = useState('');
   const [isLoggedIn, setIsLoggedIn] = useState(false);


   console.log('at app ' + token)

useEffect(() => {
    console.log('MyFunctionalComponent mounted or updated.');
    console.log(isLoggedIn + ' at app');
  });


return (
    <Router>
      <Layout isLoggedIn={isLoggedIn}>
        <Routes>
          <Route path="/" element={<Home token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/login" element={<Login token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/logout' element={<Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/registerpage' element={<RegisterPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}



const Layout = ({ children, isLoggedIn }) => {
   
  return (
    <div>
      <Nav isLoggedIn={isLoggedIn} />
      {children}
    <div>
      {isLoggedIn ? (
        <p>User is logged in.</p>
      ) : (
        <p>User is not logged in.</p>
      )}
    </div>
    </div>
  );
};



export default App;
