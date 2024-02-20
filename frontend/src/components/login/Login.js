import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import './index.css'

function Login({token, setToken, setIsLoggedIn, isLoggedIn}) {

 useEffect(() => {
    console.log('MyFunctionalComponent mounted or updated.');
    console.log(isLoggedIn + ' at loggin');
  });

    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });

    const [loginMessage, setloginMessage] = useState('');

    const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `http://localhost:8080/login`,
      {
        username: formData.username,
        password: formData.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Login successful:', response);

    // Extract token from headers
    const authorizationToken = response.headers.authorization;

    // Update state with token and login message
    setIsLoggedIn(true);
    setToken(authorizationToken);
    setloginMessage(response.data.message); // Assuming loginMessage is an object with a 'message' property

        console.log('Token in Login component:', authorizationToken);

    // Redirect to the home page
    navigate('/');

  } catch (error) {
    console.error('Login error:', error);

    // Display user-friendly error message to the user
    setloginMessage(
      error.response ? error.response.data.message : 'An error occurred during login'
    );
  }
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className='form-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>

    <Link to='/register'>Don't have an account?</Link>

      <p>{loginMessage}</p>


    </div>
  )
}

export default Login