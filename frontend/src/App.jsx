import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Workspace from './Components/Workspace/Workspace.jsx';
import CreateForms from './Components/CreateForms/CreateForms.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import Auth from './Components/Auth/Auth.jsx';
import { getUserToken } from './Utils/localStorage.js';
import Login from './Components/Login/Login.jsx';
import { CreateForm, EditForm } from './Components/CreateFormJose/CreateFormJose.jsx';
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
