import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import http from '../interceptor/axios.interceptor';
import strings from '../constants/strings.json';
import styles from '../style/Login.module.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await http.post('/users/login', {
        email,
        password,
      });

      // If login is successful, navigate to tasks page
      sessionStorage.setItem('isLoggedIn', 'true');
      navigate('/tasks');
      setErrorMessage(null); 
    } catch (error: any) {
      setErrorMessage('Invalid credentials. Please try again.');
      console.error('Error logging in:', error);
    }
  };
    useEffect(() => {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn) {
        navigate('/tasks');
      }
    }, [navigate]);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{strings.login.title}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          className={styles.inputField}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className={styles.inputField}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.submitButton}>
          {strings.login.title}
        </button>
      </form>

      {/* Conditionally display the error message */}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
