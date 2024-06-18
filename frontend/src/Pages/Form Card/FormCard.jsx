import React, { useContext } from 'react';
import style from './FormCard.module.css';
import { api, fetchForms, handleDeleteForm } from '../../utils/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { FormContext, useFormProvider } from '../../context/FormContext';
// import { handleDeleteForm } from '../../utils/api';
const FormCard = ({ form }) => {
  const queryClient = useQueryClient();
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
  console.log(form, 'recebido de workspace!')

  // const { data, error, isLoading, isError } = useQuery('forms', fetchForms);
  // const { data, error, isLoading, isError } = useQuery({
  //   queryKey: ['forms'],
  //   queryFn: fetchForms
  // });

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
    navigate(`/createform/${id}`)
  }
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className={style.formgrid}>
      {data.map((form) => (
        <div className={style.formcard} key={form._id} onClick={() => handleEdit(form._id)}>
          <p>{form.title}</p>
          <button className={style.deleteButton} onClick={(event) => handleClick(form._id, event)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default FormCard;