import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';

function App() {
    return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </Router>
  );
}


const Navigation = () => {
    return (
    <nav>
      <ul className="nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="navbar-nav ms-auto">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default App;
