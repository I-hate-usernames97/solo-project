import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    verifyPassword: ''
  });

  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/register`, formData);
      console.log('Registration successful:', response.data);
      setRegistrationMessage(response.data);
      // Redirect or show a success message
    } catch (error) {
      console.error('Registration error:', error.response.data);
      setRegistrationMessage(error.response.data);
      // Display error message to the user
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
    </div>
  );
}

export default Register;
