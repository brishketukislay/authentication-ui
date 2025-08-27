import React from 'react';
import { Link } from 'react-router-dom';
import strings from '../constants/strings.json'

const Home: React.FC = () => {
  return (
    <div>
      <h1>{strings.homePage.welcomeText}</h1>
      <nav>
        <Link to="/register">{strings.homePage.register}</Link>
        <br />
        <Link to="/login">{strings.homePage.login}</Link>
      </nav>
    </div>
  );
};

export default Home;
