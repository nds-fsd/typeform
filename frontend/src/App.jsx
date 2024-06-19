import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import Workspace from './Pages/Workspace/Workspace.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';
import Auth from './Pages/Auth/Auth.jsx';
import { getUserToken } from './Utils/localStorage.js';
import Login from './Pages/Login/Login.jsx';
import { CreateForm } from './Pages/CreateForm/CreateForm.jsx';
import QuestionForm from './Pages/CreateForm/QuestionForm.jsx';
// import CreateFormLayout from './pages/CreateForm/CreateFormLayout.jsx';
// import { useNavigate } from 'react-router-dom';
import ResponseForm from './Components/ResponsePage/ResponseForm.jsx';

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
          <Route path='/responseform/:id' element={<ResponseForm />} />
          <Route path='/workspace' element={<Workspace />} />
          <Route path='/createform/:id?' element={<CreateForm />}>
            <Route path=':idQuestion' element={<QuestionForm />} />
          </Route>
        </>
      )}
    </Routes>
  );
}

export default App;
