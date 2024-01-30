import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    verifyPassword: ''
  });

  const [registrationMessage, setRegistrationMessage] = useState('');

  const navigate = useNavigate();
   


const handleSubmit = async (e) => {
  
  e.preventDefault();

  console.log('Form Data:', formData);
  try {
    const response = await axios.post(
      `http://localhost:8080/register`,
      {
        username: formData.username,
        password: formData.password,
        verifyPassword: formData.verifyPassword,
        email: formData.email,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Registration successful:', response.data);
    setRegistrationMessage(response.data);

    navigate('/login');

  } catch (error) {
if (error.response) {
    // Server responded with a status code outside the range of 2xx
    console.error('Server Response Data:', error.response.data);
    console.error('Server Response Status:', error.response.status);
    console.error('Server Response Headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received. Check server availability.');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error setting up the request:', error.message);
  }

  // TODO: Display user-friendly error message to the user
  setRegistrationMessage(error.response ? error.response.data : 'An error occurred during registration');
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
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

    
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <input
          type="password" // Corrected to "password"
          name="verifyPassword"
          value={formData.verifyPassword}
          onChange={handleChange}
          placeholder="Verify Password"
        />


        <button type="submit">Register</button>
      </form>

      <p>{registrationMessage.message}</p>
    </div>
  );
}

export default Register;
