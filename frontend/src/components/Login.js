import React, { useState } from 'react'
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });

    const [registrationMessage, setRegistrationMessage] = useState('');

    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`http://localhost:8080/login`,
    formData);

    console.log('Registration successful:', response.data);
    setRegistrationMessage(response.data);
    
    const authToken = response.data.token;
    localStorage.setItem('authToken', authToken);
    console.log('Authorization Token:', authToken);

  } catch (error) {
    console.error('Registration error:', error.response.data);
    setRegistrationMessage(error.response.data);
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

      <p>{registrationMessage.error}</p>
    </div>
  )
}

export default Login