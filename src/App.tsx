import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';
import Tasks from './components/Tasks';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Logout /> {/* Logout component will only show if the user is authenticated */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
