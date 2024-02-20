import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn, isLoggedIn }) => {
  const [loading, setLoading] = useState(true);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      fetch('http://localhost:8080/logout', {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => {
          if (response.ok) {
            console.log('Logout successful');
            setLogoutSuccess(true);
            setIsLoggedIn(false);
            navigate('/');
          } else {
            console.error('Logout failed');
          }
        })
        .catch((error) => {
          console.error('Error during logout:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    handleLogout();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!logoutSuccess) {
    return <div>Logout failed.</div>;
  }
};

export default Logout;
