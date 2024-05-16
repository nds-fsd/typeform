import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Workspace from './Components/Workspace/Workspace.jsx';
import CreateForms from './Components/CreateForms/CreateForms.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';

function App() {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/workspace' element={<Workspace />} />
      <Route path='/createforms' element={<CreateForms />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
}

export default App;
