import React, { useEffect, useState } from 'react';
import http from '../interceptor/axios.interceptor';
import strings from '../constants/strings.json';
import { useNavigate } from 'react-router-dom';
import styles from '../style/Register.module.scss'; // Assuming you have a specific module for Register styling

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to hold the error message
  const navigate = useNavigate();
      useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
          navigate('/tasks');
        }
      }, [navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await http.post('/users/register', {
        email,
        password,
      });
      navigate('/login'); // Redirect to login page after successful registration
      setErrorMessage(null); // Clear any previous error messages
    } catch (error: any) {
      if (error.response && error.response.data.message === 'User already exists') {
        setErrorMessage(strings.register.userExists);
      } else {
        setErrorMessage(strings.errors.errorOccured);
      }
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{strings.register.title}</h2>
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
        <input
          type="password"
          className={styles.inputField}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className={styles.submitButton}>
          {strings.register.title}
        </button>
      </form>

      {/* Conditionally display the error message */}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default Register;
export { };