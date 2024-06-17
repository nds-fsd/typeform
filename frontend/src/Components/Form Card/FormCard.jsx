import React from 'react';
import { api } from '../../Utils/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

const FormCard = () => {

  const queryClient = useQueryClient();

  const fetchForms = async () => {
    const res = await api().get('/form');
    return res.data;
  };
  
  const navigate = useNavigate();

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

  // if (isLoading) {
  //   return <span className="flex justify-center loading loading-infinity loading-lg scale-1"></span>;
  // }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const handleEdit = (id) => {
    navigate(`/editform/${id}`)
  }

  return (
    <div className="grid grid-cols-4 m-7 grid-rows-auto gap-3.5 relative">
      {isLoading
      ? <span className="flex justify-center align-middle loading loading-infinity w-72 h-72"></span>
      :data.map((form) => (
        <div className="flex items-center justify-center rounded-2xl h-52 font-space-mono shadow-md bg-azure hover:bg-white 
        hover:shadow-none hover:border hover:border-gray-600 transition-all duration-300" key={form._id} onClick={() => handleEdit(form._id)}>
          <p className='text-gray-900'>{form.title}</p>
          <button onClick={() => handleClick(form._id)}>
            <span className="text-white">i</span>X 
          </button> 
        </div>
        //esto es poco elegante pero es mientras se diseña un botón o ícono de delete
      ))}

    </div>
  );
};

export default FormCard;
