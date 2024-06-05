import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../Utils/api';
import { useMutation } from 'react-query';
import { setUserSession } from '../../Utils/localStorage';
import style from './SignUp.module.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data) => {
    try {
      const response = await api().post('/signup', data);
      if (response?.data.token) {
        setUserSession(response.data);
        navigate('/workspace');
      }
      return response.data;
    } catch (err) {
      throw err.response?.data.error;
    }
  };

  // const mutation = useMutation(newUser, {
  //   onSuccess: () => {
  //     setError(null);
  //     navigate('/workspace');
  //   },
  //   onError: (error) => {
  //     setError(error);
  //   },
  // });

  // const onSubmit = (data) => {
  //   mutation.mutate(data);
  // };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={style.title}>Sign Up</h1>
        <label htmlFor='email'>EMAIL</label>
        <input
          {...register('email', {
            required: {
              value: true,
              message: '*email is required'
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: '*Invalid email format'
            },
          })}
          placeholder='email'
        />
        {errors.email &&
          <p style={{ color: 'red' }}>{errors.email.message}</p>}

        <label htmlFor='name'>NAME</label>
        <input
          {...register('name', {
            required: {
              value: true,
              message: '*name is required'
            }
          })}
          placeholder='name'
        />
        {errors.name &&
          <p style={{ color: 'red' }}>{errors.name.message}</p>}

        <label htmlFor='password'>PASSWORD</label>
        <input
          type='password'
          {...register('password', {
            required: {
              value: true,
              message: '*password is required'
            },
            minLength: {
              value: 6,
              message: '*password needs at least 6 characters'
            },
          })}
          placeholder='password'
        />
        {errors.password &&
          <p style={{ color: 'red' }}>{errors.password.message}</p>}

        <input className={style.submit} type='submit' value={'Sign up'} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>
          ¿Ya tienes una cuenta?{' '}
          <span
            className={style.login}
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

//use navigate
