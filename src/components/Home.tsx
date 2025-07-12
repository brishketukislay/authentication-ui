import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <nav>
        <Link to="/register">Go to Register</Link>  {/* Link to Register Page */}
        <br />
        <Link to="/login">Go to Login</Link>      {/* Link to Login Page */}
      </nav>
    </div>
  );
};

export default Home;
