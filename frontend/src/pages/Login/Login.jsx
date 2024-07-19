import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../utils/api.js';
import { setUserSession } from '../../utils/localStorage.js';
import { useNavigate } from 'react-router-dom';
import LargeButton from '../../components/Buttons/LargeButton.jsx';
import Input from '../../components/Form/Input.jsx';
import { sendError } from 'zod-express-middleware';
import { useUserProvider } from '../../context/UserContext.jsx';


const Login = () => {
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  const { setUserInContext } = useUserProvider();

  const onSubmit = (data) => {
    api().post('/login', data)
      .then((response) => {
        setUserSession(response.data);
        setUserInContext();
        navigate('/workspace');
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: onSubmit });

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="bg-white/50 p-16 rounded-3xl shadow-md w-full max-w-md flex flex-col items-center">
        <h1 className="mb-6 text-center">Welcome back!</h1>
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
          <p className="cursor-pointer hover:underline"
            onClick={() => { navigate('/signup') }}>Not registered? Sign Up!</p>
        </form>
      </div>
    </div>
  );
};


export default Login;