import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import http from '../interceptor/axios.interceptor';
import strings from '../constants/strings.json';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await http.post('/users/login', {
        email,
        password
      });
      navigate('/joke');
      alert('Logged in Successfully');
      console.log(response.data);  // JWT token, which you can save in localStorage
      sessionStorage.setItem('jwt_token',(response.data.token));
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div>
      <h2>{strings.login.title}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
