import React, { useContext } from 'react';
import style from './FormCard.module.css';
import { api, handleDeleteForm } from '../../utils/api';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useFormProvider } from '../../context/FormContext';

const FormCard = ({ form }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setOnEditForm, isLoading, isError } = useFormProvider();
  // console.log(form, 'recebido de workspace')

  const handleClick = (formId, event) => {
    console.log(formId)
    event.stopPropagation();
    deleteFormByIdMutation.mutate(formId);
  };

  const deleteFormByIdMutation = useMutation(['forms'], handleDeleteForm, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('forms');
      console.log('Form deleted successfully', data);
    },
    onError: (error) => {
      console.error('Error deleting form', error);
    },
  });

  const handleEdit = (id) => {
    setOnEditForm(form);
    navigate(`/createform/${id}`)
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className={style.formgrid}>
      <div className={style.formcard} onClick={() => handleEdit(form._id)}>
        <p>{form.title}</p> {/* Verifique se aqui não está tentando renderizar um objeto */}
        <button className={style.deleteButton} onClick={(event) => handleClick(form._id, event)}>
          X
        </button>
      </div>
    </div>
  );
};

export default FormCard;
