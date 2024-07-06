import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Workspace from './pages/Workspace/Workspace.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import { getUserToken } from './utils/localStorage.js';
import Login from './pages/Login/Login.jsx';
import { CreateForm } from './pages/CreateForm/CreateForm.jsx';
import QuestionForm from './pages/CreateForm/QuestionForm.jsx';
import ResponseForm from './pages/ResponsePage/ResponseForm.jsx';
import FormAnswers from './pages/FormAnswers/FormAnswers.jsx';

function App() {
  const navigate = useNavigate();
  const token = getUserToken();

  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      {token && (
        <>
          <Route path='/formAnswers' element={<FormAnswers />} />
          <Route path='/responseform/:id' element={<ResponseForm />} />
          <Route path='/workspace' element={<Workspace />} />
          <Route path='/createform/:id?' element={<CreateForm />} />
        </>
      )}
      <Route path='/' element={<Navigate to={token ? '/workspace' : '/home'} replace={true} />} />
    </Routes>
  );
}

export default App;
