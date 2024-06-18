import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../Form Card/FormCard';
import style from './Workspace.module.css';

const Workspace = () => {
  const navigate = useNavigate();

  return (
    <div className={style.viewport}>
      <h1>My Workspace</h1>
      <div className={style.frame}>
        <button className={style.btn} onClick={() => navigate('/createform')}>
          Add New Form
        </button>
        <FormCard className={style.formcard} />
      </div>
    </div >
  );
};

export default Workspace;