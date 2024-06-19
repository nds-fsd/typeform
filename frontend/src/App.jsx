import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Workspace from './pages/Workspace/Workspace.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import { getUserToken } from './utils/localStorage.js';
import Login from './pages/Login/Login.jsx';
import { CreateForm } from './pages/CreateForm/CreateForm.jsx';
import QuestionForm from './pages/CreateForm/QuestionForm.jsx';
import ResponseForm from './Components/ResponsePage/ResponseForm.jsx';

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
