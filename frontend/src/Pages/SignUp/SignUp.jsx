import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../Utils/api';
import { useMutation } from 'react-query';
import { setUserSession } from '../../Utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { LargeButton } from '../../Components/Buttons/LargeButton';

const SignUp = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const newUser = async (data) => {
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

  const mutation = useMutation(newUser, {
    onSuccess: () => {
      setError(null);
      navigate('/workspace');
    },
    onError: (error) => {
      setError(error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="bg-white p-16 rounded-3xl shadow-md w-full max-w-md flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 font-rubik">Register to Flow!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full flex flex-col items-center">

          <div className="w-full">
            <label htmlFor='email' className="block text-sm font-medium text-gray-900 font-space mono">Email</label>
            <input className=" font-space mono mt-1 block w-full px-3 py-2 bg-white border border-gray-300 
            rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              {...register('email', {
                required: { value: true, message: '*email is required' },
                pattern: { value: /^\S+@\S+$/i, message: '*Invalid email format' },
              })}
              placeholder='Email'
            ></input>
            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
          </div>

          <div className="w-full">
            <label htmlFor='name' className="block text-sm font-medium text-gray-900 font-space mono">Name</label>
            <input className=" font-space mono mt-1 block w-full px-3 py-2 bg-white border border-gray-300 
            rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              {...register('name', { required: { value: true, message: '*name is required' } })}
              placeholder='Name'
            ></input>
            {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
          </div>

          <div className="w-full">
            <label htmlFor='password' className="block text-sm font-medium text-gray-900 font-space mono">Password</label>
            <input className=" font-space mono mt-1 block w-full px-3 py-2 bg-white border border-gray-300 
            rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              type='password'
              {...register('password', {
                required: { value: true, message: '*password is required' },
                minLength: { value: 6, message: '*password needs at least 6 characters' },
              })}
              placeholder='Password'
            ></input>
            {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
          </div>

            {/* <input className={style.submit} type='submit' value={'Sign up'} disabled={mutation.isLoading}></input>
            {error && <p style={{ color: 'red' }}>{error}</p>} */}
            <LargeButton submit={handleSubmit(onSubmit)} text={"SIGN UP"} />
            <p className="w-full flex flex-row justify-center text-blue-600 hover:text-blue-800 text-sm font-space mono cursor-pointer" 
            onClick={() => {navigate('/login');}} >You have an account? Login!</p>

        </form>
      </div>
    </div>
  );
};

export default SignUp;

//use navigate
