import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Workspace from './Components/Workspace/Workspace.jsx';
import CreateForms from './Components/CreateForms/CreateForms.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import Auth from './Components/Auth/Auth.jsx';
import { getUserToken } from './Utils/localStorage.js';
import Login from './Components/Login/Login.jsx';
import EditForm from './Components/EditForm/EditForm.jsx';
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
      <Route path='/editform/:formId' element={<EditForm />} />
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
