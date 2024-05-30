import React from 'react';
import style from './FormCard.module.css';
import { api } from '../../Utils/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
// import { Link } from 'react-router-dom';


const FormCard = () => {
  const queryClient = useQueryClient();

  const fetchForms = async () => {
    const res = await api().get('/form');
    return res.data;
  };

  const { data, error, isLoading, isError } = useQuery('forms', fetchForms);

  const deleteForm = async (formId) => {
    const res = await api().delete(`/form/${formId}`);
    return res.data;
  };

  const mutation = useMutation(deleteForm, {
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

  return (
    <div className={style.formgrid}>
      {data.map((form) => (
        <a href={`/editform/${form._id}`}>
          <div className={style.formcard} key={form._id} >
            <p>{form.title}</p>
            <button className={style.deleteButton} onClick={() => handleClick(form._id)}>
              X
            </button>

          </div>
        </a>
      ))}

    </div>
  );
};

export default FormCard;

// <a> or <Link />?
// <Link to={`/editform/${form._id}`}>?</Link>
