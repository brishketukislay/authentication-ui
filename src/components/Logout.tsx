import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import http from '../interceptor/axios.interceptor';
import styles from '../style/Logout.module.css';
import strings from '../constants/strings.json';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // List of routes where the logout button should NOT appear
  const hideOnRoutes = ['/', '/login', '/register'];

  // If the current route matches any of the routes in hideOnRoutes, do not show the button
  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  const logout = async () => {
    try {
      console.log("Logging out...");
      await http.post('/users/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      document.cookie = 'access_token=; Max-Age=0; path=/;';
      document.cookie = 'refresh_token=; Max-Age=0; path=/;';
      sessionStorage.removeItem('isLoggedIn'); // Clear login status from localStorage
      navigate('/'); // Redirect to login page after logout
    }
  };

  return (
    <button onClick={logout} className={styles.logoutButton}>
        {strings.logout.title}
    </button>
  );
};

export default Logout;
export { };