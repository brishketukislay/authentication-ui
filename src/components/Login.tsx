import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../interceptor/axios.interceptor';
import strings from '../constants/strings.json';
import styles from '../style/Login.module.css'; // Assuming you're using CSS modules

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await http.post('/users/login', { email, password });
      sessionStorage.setItem('isLoggedIn', 'true');
      navigate('/tasks'); // Redirect to tasks page after successful login
      console.log(response.data);
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{strings.login.title}</h2>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          {strings.login.title}
        </button>
      </form>
    </div>
  );
};

export default Login;
