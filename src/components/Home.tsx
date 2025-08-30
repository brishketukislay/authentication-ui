import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import strings from '../constants/strings.json';
import styles from '../style/Home.module.scss';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  useEffect(() => {
    // Redirect to /tasks if logged in
    console.log("isLoggedIn:", isLoggedIn);
    if (isLoggedIn) {
      navigate('/tasks');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{strings.homePage.welcomeText}</h1>
      <div className={styles.nav}>
        <Link to="/register" className={styles.navLink}>
          {strings.homePage.register}
        </Link>
        <Link to="/login" className={styles.navLink}>
          {strings.homePage.login}
        </Link>
      </div>
    </div>
  );
};

export default Home;
export { };