import React from 'react';
import style from './FormCard.module.css';
import { api } from '../../Utils/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';


const FormCard = () => {
  const queryClient = useQueryClient();

  const fetchForms = async () => {
    const res = await api().get('/form');
    return res.data;
  };

  const { data, error, isLoading, isError } = useQuery('forms', fetchForms);

  const handleDeleteForm = async (formId, event) => {
    // event.stopPropagation();   no ha funcionado en conjunto con useMutation
    const res = await api().delete(`/form/${formId}`);
    return res.data;
  };

  const mutation = useMutation(handleDeleteForm, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('forms');
      console.log('Form deleted successfully', data);
    },
    onError: (error) => {
      console.error('Error deleting form', error);
    },
  });

  const handleClick = (formId) => {
    mutation.mutate(formId);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }
  // add <p>created: {data.creationDateTime}</p> as onHover to each card 
  // add confirmation to delete button and move it to be option in a menu (appears onClick on ...)
  // OR add 
  return (
    <div className={style.formgrid}>
      {data.map((form) => (
        <div className={style.formcard} key={form._id} >
          <Link to={`/create-form/${form._id}`}>
            <p>{form.title}</p>
          </Link>

          <button className={style.deleteButton} onClick={(event) => handleClick(form._id, event)}>
            X
          </button>

        </div>
      ))}

    </div>
  );
};

export default FormCard;
// <a> or <Link />?
// <Link to={`/editform/${form._id}`}>?</Link>
