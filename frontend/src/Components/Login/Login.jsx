import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../Utils/api';
import { setUserSession } from '../../Utils/localStorage';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useMutation } from 'react-query';
import { baseUrl } from '../../Utils/config';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log('Form data:', data); // Adicionando log para verificar os dados
      const response = await api().post('/login', data);
      setUserSession(response.data);
      navigate('/workspace');
    } catch (error) {
      console.error('Login error:', error.response); // Adicionando log para verificar o erro
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className={styles.mastercontainer}>
      <div className={styles.logincontainer}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputgroup}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              {...register("email", {
                required: { value: true, message: 'Email is required' },
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
              })}
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
          </div>
          <div className={styles.inputgroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: { value: true, message: 'Password is required' } })}
            />
            {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
          </div>
          <input className={styles.submitbutton} type="submit" value="Login" />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <a href={`${baseUrl}/signup`}>Not registered? Sign Up!</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
