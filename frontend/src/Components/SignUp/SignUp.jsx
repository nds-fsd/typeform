import React from 'react';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>SIGN UP</h1>
        <label for='name'>NAME</label>
        <input {...register('name', { required })} placeholder='name'></input>

        <label for='email'>EMAIL</label>
        <input {...register('email', { required })} placeholder='email'></input>

        <label for='password'>PASSWORD</label>
        <input type='password' {...register('password', { required })} placeholder='password'></input>
      </form>
    </>
  );
};

export default SignUp;
