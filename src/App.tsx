import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import RandomJoke from './components/joke';
import Tasks from './components/Tasks';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route path="/joke" element={<RandomJoke />} />
          <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
};

export default App;
