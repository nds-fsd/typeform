import React from 'react';
import styles from './Auth.module.css';

const Auth = () => {

  const handleClickSignup = () =>{
    window.location.href = 'http://localhost:3000/signup'
  }

  const handleClickLogin = () =>{
    window.location.href = 'http://localhost:3000/login'
  }

  return (
    <div className={styles.container}>
      <h1>Auth page</h1>
      <div className={styles['button-container']}>
        <button className={styles.button} onClick={handleClickLogin}>Login</button>
        <button className={styles.button} onClick={handleClickSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default Auth;
