import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import FormCard from '../Form Card/FormCard';
import style from './Workspace.module.css';
import { api } from '../../utils/api';

const handleClick = () => {
  // const createForm = async () => {
  //   try {
  //     const res = await api().post(`/form`)
  //     console.log(res.data)
  //     return res.data;
  //   } catch (error) {
  //     console.log('Error fetching form')
  //   };
  // };
  // createForm();


};

const Workspace = () => {
  const navigate = useNavigate();

  return (
    <div className={style.viewport}>
      <h1>My Workspace</h1>
      <div className={style.frame}>
        <button className={style.btn} onClick={() => navigate('/createforms')}>
          Add New Form
        </button>
        <FormCard className={style.formcard} />
      </div>
    </div >
  );
};

export default Workspace;

//// tentativa de crear un nuevo form al hacer click en el boton
////y luego despues dirigirse a /createform/:newlyCreated_id
// const Workspace = () => {
//   const history = useHistory();

//   const handleClick = async () => {
//     try {
//       const res = await api().post(`/form`);
//       console.log(res.data);
//       // va a la pagina solo despues de haber creado un nuevo form
//       history.push('/createforms');
//     } catch (error) {
//       console.log('Error creating form:', error);
//     }
//   };