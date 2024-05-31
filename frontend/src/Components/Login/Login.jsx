import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../Utils/api';
import { setUserSession } from '../../Utils/localStorage';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useMutation } from 'react-query';


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

  return (

      <div className={styles.mastercontainer}>
        <div className={styles.logincontainer}>
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputgroup}>
              <label htmlFor="email">Email</label>
              <input type="text" placeholder="Email"
              {...register ("email", {
              required: { value: true, message: 'Email is required'},
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
              })}/>
              {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>
            <div className={styles.inputgroup}>
              <label htmlFor="password"> Contraseña </label>
              <input type="password" placeholder="Contraseña" {...register ("password", { required: true })}/>
              <input className={styles.submitbutton} type="submit" value="Login"/>
              {error && <p style={{ color: 'red' }}>{error.password}</p>}
              <a href='http://localhost:3000/signup'>Not registered? Sign Up!</a>
            </div>
          </form>
        </div>
      </div>

        );
    };


export default Login;
