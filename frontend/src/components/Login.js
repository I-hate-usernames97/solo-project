import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });

    const [registrationMessage, setRegistrationMessage] = useState('');

    const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();

  console.log('Form Data:', formData);

  try {
    const response = await axios.post(
      `http://localhost:8080/login`,
      {
        username: formData.username,
        password: formData.password,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Login successful:', response.data);
    setRegistrationMessage(response.data);

    // Redirect to the home page
    navigate('/');

  } catch (error) {
    console.error('Login error:', error);

    // Display user-friendly error message to the user
    setRegistrationMessage(
      error.response ? error.response.data : 'An error occurred during login'
    );
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

      <a href='/register'>dont have an account?</a>

      <p>{}</p>
    </div>
  )
}

export default Login