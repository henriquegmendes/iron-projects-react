import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';

import MyProjects from './components/pages/MyProjects/MyProjects';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/my-projects" element={<MyProjects />} />
    </Routes>
  );
};

export default App;
