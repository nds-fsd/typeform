import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Workspace from './components/Workspace/Workspace.jsx';
import CreateForms from './components/CreateForms/CreateForms.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Auth from './components/Auth/Auth.jsx';
import { getUserToken } from './utils/localStorage.js';
import Login from './components/Login/Login.jsx';
import { CreateForm, EditForm } from './components/CreateFormJose/CreateFormJose.jsx';
// import { useNavigate } from 'react-router-dom';

function App() {
  // const navigate = useNavigate();
  const token = getUserToken();

  // useEffect (() => {
  //   if(!token) {
  //     navigate('/home')
  //   }
  // },[token, navigate])

  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      {token && (
        <>
          <Route path='/workspace' element={<Workspace />} />
          <Route path='/createforms' element={<CreateForms />} />
          <Route path='/createform' element={<CreateForm />} />
          <Route path='/editform/:id' element={<EditForm />} />
        </>
      )}
    </Routes>
  );
}

export default App;
