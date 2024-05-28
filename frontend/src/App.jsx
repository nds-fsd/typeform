import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Workspace from './Components/Workspace/Workspace.jsx';
import CreateForms from './Components/CreateForms/CreateForms.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import Auth from './Components/Auth/Auth.jsx';
import { getUserToken } from './Utils/localStorage.js';

function App() {
  const navigate = useNavigate();
  const token = getUserToken();
  if (!token) {
    navigate('/signup');
  }
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/signup' element={<SignUp />} />
      {token && (
        <>
          <Route path='/workspace' element={<Workspace />} />
          <Route path='/createforms' element={<CreateForms />} />
        </>
      )}
    </Routes>
  );
}

export default App;
