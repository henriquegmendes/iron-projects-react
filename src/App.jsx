import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';

import MyProjects from './components/pages/MyProjects/MyProjects';
import ProjectDetails from './components/pages/ProjectDetails/ProjectDetails';

import ProtectedRoute from './components/miscelaneous/ProtectedRoute/ProtectedRoute';

const App = () => {
  const verifyLoggedUser = () => {
    const token = localStorage.getItem('token');

    return !!token;
  };

  const [isUserLogged, setIsUserLogged] = useState(verifyLoggedUser());

  const loginUser = () => {
    setIsUserLogged(true);
  };

  return (
    <Routes>
      <Route path="/" element={<Login loginUser={loginUser} />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/my-projects"
        element={<ProtectedRoute isLogged={isUserLogged} Page={MyProjects} />}
      />

      <Route
        path="/my-projects/:projectId"
        element={<ProtectedRoute isLogged={isUserLogged} Page={ProjectDetails} />}
      />
    </Routes>
  );
};

export default App;
