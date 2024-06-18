import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../Form Card/FormCard';
import style from './Workspace.module.css';
import { useFormProvider } from '../../context/FormContext';

const Workspace = () => {
  const navigate = useNavigate();
  const {
    onEditForm,
    setOnEditForm,
    allForms,
    setAllForms,
    data,
    error,
    isLoading,
    isError
  } = useFormProvider();


  return (
    <div className={style.viewport}>
      <h1>My Workspace</h1>
      <div className={style.frame}>
        <button className={style.btn} onClick={() => navigate('/createform')}>
          Add New Form
        </button>
        <FormCard className={style.formcard} />
        {allForms.map((form) => (
          <FormCard key={form._id} form={form} />
        ))}
      </div>
    </div >
  );
};

export default Workspace;