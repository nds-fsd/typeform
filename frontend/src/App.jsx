import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Workspace from './Components/Workspace/Workspace.jsx';
import CreateForms from './Components/CreateForms/CreateForms.jsx';

function App() {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/workspace' element={<Workspace />} />
      <Route path='/createforms' element={<CreateForms />} />
    </Routes>
  );
}

export default App;
