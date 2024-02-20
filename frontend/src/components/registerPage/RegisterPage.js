import React, { useState } from 'react';
import './Register.css'
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '', 
    email: '',
    password: '',
    verifyPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'email is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (formData.password !== formData.verifyPassword) {
      newErrors.verifyPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Replace with actual API endpoint
        const response = await fetch('http://localhost:8080/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        console.log('API response:', response);

        if (response.ok) {
          setSuccessMessage('Registration successful!');
        } else {
          const data = await response.json();
          setErrors({ apiError: data.message });
        }
      } catch (error) {
        console.error('Error registering user:', error);
        setErrors({ apiError: 'An error occurred while registering user' });
      }
    }
  };

  return (
    <div className='form-container'>
      <h2>Register</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errors.apiError && <p style={{ color: 'red' }}>{errors.apiError}</p>}
      <form onSubmit={handleRegister}>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
       
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder='password'
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

          <input
            type="password"
            name="verifyPassword"
            placeholder='password'
            value={formData.verifyPassword}
            onChange={handleChange}
          />
          {errors.verifyPassword && (
            <p style={{ color: 'red' }}>{errors.verifyPassword}</p>
          )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
