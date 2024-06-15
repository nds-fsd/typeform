import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Workspace from './pages/Workspace/Workspace.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Auth from './pages/Auth/Auth.jsx';
import { getUserToken } from './utils/localStorage.js';
import Login from './pages/Login/Login.jsx';
import { CreateForm } from './pages/CreateForm/CreateForm.jsx';
import QuestionForm from './pages/CreateForm/QuestionForm.jsx';
import QuestionDetails from './pages/CreateForm/QuestionDetails.jsx';
// import CreateFormLayout from './pages/CreateForm/CreateFormLayout.jsx';
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
          <Route path="/createform/:id?" element={<CreateForm />}>
            <Route path=":idQuestion" element={<QuestionDetails />} />
          </Route>
        </>
      )}
    </Routes>
  );
}

export default App;
