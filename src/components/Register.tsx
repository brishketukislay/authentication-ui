import React, { useState } from 'react';
import http from '../interceptor/axios.interceptor';
import styles from '../style/Register.module.css'; // Import CSS Module for scoped styles

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      const response = await http.post('/users/register', {
        email,
        password,
      });
      alert('User Registered Successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            className={styles.inputField}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className={styles.inputGroup}>
          <input
            type={showPassword ? 'text' : 'password'}
            className={styles.inputField}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles.eyeIcon}
          >
            {showPassword ? (
              <i className="fas fa-eye-slash"></i> // FontAwesome eye-slash icon
            ) : (
              <i className="fas fa-eye"></i> // FontAwesome eye icon
            )}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className={styles.inputGroup}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className={styles.inputField}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className={styles.eyeIcon}
          >
            {showConfirmPassword ? (
              <i className="fas fa-eye-slash"></i> // FontAwesome eye-slash icon
            ) : (
              <i className="fas fa-eye"></i> // FontAwesome eye icon
            )}
          </button>
        </div>

        {/* Password mismatch message */}
        {!passwordMatch && (
          <p className={styles.errorMessage}>Passwords do not match</p>
        )}

        <button type="submit" className={styles.submitButton}>Register</button>
      </form>
    </div>
  );
};

export default Register;
