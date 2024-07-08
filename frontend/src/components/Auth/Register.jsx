import React, { useState } from 'react';
import AuthService from '../../services/AuthService';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user' // Default role
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(formData);
      console.log('Registration successful');
      alert('Registration successful');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginLeft:"100px",marginTop:"40px"}}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      /> <br/> <br/>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />  <br/> <br/>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />  <br/> <br/>
      <select name="role" value={formData.role} onChange={handleChange} required>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>  <br/> <br/>
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
