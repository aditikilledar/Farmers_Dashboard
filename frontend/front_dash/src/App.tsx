import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import Signup from './components/Signup';

const App: React.FC = () => {
  return (
    // <Login/>
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </Router>
  );
};

export default App;
