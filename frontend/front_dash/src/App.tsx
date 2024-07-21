import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import Login from './components/Login';
import Signup from './components/Signup';
import WeatherPage from './components/WeatherPage';

const App: React.FC = () => {
  return (
    // <Login/>
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
};

export default App;
