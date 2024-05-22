import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Workspace from './Components/Workspace/Workspace.jsx';
import CreateForms from './Components/CreateForms/CreateForms.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import { getUserToken } from './Utils/localStorage.js';

function App() {
  const token = getUserToken();

  return (
    <Routes>
      <Route path='/home' element={<Home />} />
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
