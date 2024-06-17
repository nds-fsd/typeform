import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../Utils/api';
import { setUserSession } from '../../Utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { LargeButton } from '../../Components/Buttons/LargeButton';



const Login = () => {

  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    api().post('/login', data)
      .then((response) => {
        setUserSession(response.data);
        navigate('/workspace');
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };
console.log(onSubmit)

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="bg-white p-16 rounded-3xl shadow-md w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 font-rubik">Welcome back!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full flex flex-col items-center">
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 font-space mono">Email</label>
            <input 
              type="text" 
              placeholder="Email"
              className=" font-space mono mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              {...register("email", {
                required: { value: true, message: 'Email is required' },
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
              })} 
            />
            {errors.email && <p className="text-red-600 text-sm font-space mono">{errors.email.message}</p>}
          </div>
          <div className="w-full">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
            <input 
              type="password" 
              placeholder="Password" 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              {...register("password", { required: true })} 
            />
            {error && <p className="text-red-600 text-sm">{error.password}</p>}
          </div>
            <LargeButton submit={handleSubmit(onSubmit)} text={"LOGIN"} />
            <a className="flex flex-row text-blue-600 hover:text-blue-800 text-sm font-space mono cursor-pointer" 
            onClick={() => {navigate('/signup')}}>Not registered? Sign Up!</a>
        </form>
      </div>
    </div>
  );
};



export default Login;
