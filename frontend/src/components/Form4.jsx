import React from 'react';
import { useForm } from 'react-hook-form';
import './Form.css';

const Formulario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    return;
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('response is not ok');
        } else {
          return response.json();
        }
      })
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='plantType'>Plant Type:</label>
      <input {...register('plantType', { required: true, minLength: 3 })} />
      {errors.firstName?.type === 'required' && <p>Name is required!</p>}
      {errors.firstName?.type === 'minLength' && <p>min 3 characteres required!</p>}
      <br />
      <label htmlFor='plantColor'>Color:</label>
      <input {...register('plantColor')} />
      <br />
      <label htmlFor='likesSun'>Likes Sun:</label>
      <input {...register('likesSun')} />
      <br />
      <input type='submit' value='enviar' />
    </form>
  );
};

export default Formulario;
