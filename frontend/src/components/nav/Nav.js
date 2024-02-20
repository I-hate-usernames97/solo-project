import React from 'react'
import { Link } from 'react-router-dom';
import './nav.css';

const Nav = ( { isLoggedIn } ) => {

  return (
  <>
    <nav className='navbar'>
      <div className='navbar-container'>
      <div>
        <Link to="/" className="navbar-logo">
        Your Logo
        </Link>
      </div>
      <div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/registerpage" className="nav-link">
                Register
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
            <Link to="/Logout" className="nav-link">
              Logout
            </Link>
            ) : (
            <Link to="/Login" className="nav-link">
              Login
            </Link>
            )}
          </li>
          </ul>      
      </div>
      </div>
    </nav>    
  </>
  );
};

export default Nav;
