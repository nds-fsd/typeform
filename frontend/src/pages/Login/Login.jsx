import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../utils/api';
import { setUserSession } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { LargeButton } from '../../components/Buttons/LargeButton';
import Input from '../../components/ui/Input';
import { sendError } from 'zod-express-middleware';


const Login = () => {

  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    api().post('/login', data)
      .then((response) => {
        setUserSession(response.data);
        navigate('/workspace');
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    console.log(error.email)
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: onSubmit });

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="bg-white p-16 rounded-3xl shadow-md w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 font-rubik">Welcome back!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full flex flex-col items-center">
          <div className="w-full">
            <Input
              error={errors?.email?.message}
              label="Email"
              placeholder='Email'
              {...register('email', {
                required: { value: true, message: 'Email is required' },
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
              })}
            />
            {error.email &&
              <p
                id="email_error"
                className="text-red-600 text-sm font-space mono">
                {error.email}
              </p>
            }
          </div>
          <div className="w-full">
            <Input
              error={errors?.password?.message}
              label="Password"
              placeholder='Password'
              type='password'
              {...register('password', {
                required: { value: true, message: 'Password is required' }
              })}
            />
            {error.password &&
              <p
                id="password_error"
                className="text-red-600 text-sm font-space mono">
                {error.password}
              </p>
            }
          </div>
          <LargeButton submit={handleSubmit(onSubmit)} text={"LOGIN"} />
          <a className="flex flex-row text-blue-600 hover:text-blue-800 text-sm font-space mono cursor-pointer"
            onClick={() => { navigate('/signup') }}>Not registered? Sign Up!</a>
        </form>
      </div>
    </div>
  );
};


export default Login;