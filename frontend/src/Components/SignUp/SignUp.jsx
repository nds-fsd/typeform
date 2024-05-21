import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../Utils/api';
import { useMutation } from 'react-query';

const SignUp = () => {
  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const newUser = (data) => {
    api.post('/signup', data);
  };

  const mutation = useMutation(newUser, {
    onSuccess: () => {
      setError(undefined);
    },
    onError: (error) => {
      console.log(error);
      setError(error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>SIGN UP</h1>
        <label htmlFor='email'>EMAIL</label>
        <input
          {...register('email', {
            required: { value: true, message: 'email is required' },
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
          })}
          placeholder='email'
        ></input>
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

        <label htmlFor='name'>NAME</label>
        <input
          {...register('name', { required: { value: true, message: 'name is required' } })}
          placeholder='name'
        ></input>
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

        <label htmlFor='password'>PASSWORD</label>
        <input
          type='password'
          {...register('password', {
            required: { value: true, message: 'password is required' },
            minLength: { value: 6, message: 'password needs at least 6 characters' },
          })}
          placeholder='password'
        ></input>
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

        <input type='submit' value={'Sign up'}></input>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
