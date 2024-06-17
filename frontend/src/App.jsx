import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import Workspace from './Pages/Workspace/Workspace.jsx';
import CreateForms from './Pages/CreateForms/CreateForms.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';
import { getUserToken } from './Utils/localStorage.js';
import Login from './Pages/Login/Login.jsx';
import { CreateFormJose, EditForm } from './Pages/CreateFormJose/createFormJose.jsx';

function App() {
  const navigate = useNavigate();
  const token = getUserToken();

  useEffect (() => {
    if(!token) {
      navigate('/login')
    }
  },[token, navigate])

  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/create-form/:formId' element={<CreateForms />} />
      {token && (
        <>
          <Route path='/workspace' element={<Workspace />} />
          <Route path='/createforms' element={<CreateForms />} />
          <Route path='/createformjose' element={<CreateFormJose />} />
          <Route path='/editform/:id' element={<EditForm />} />
        </>
      )}
    </Routes>
   
  );
}

export default App;
