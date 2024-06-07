import React from 'react';
import { useForm } from 'react-hook-form';
import useLogin from './useLogin';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, error } = useLogin();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data);
  };

  return (
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
        <span onClick={() => { navigate('/signup') }}>
          Not registered? Sign Up!
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
