import React from 'react';
import styles from './Auth.module.css'; 

const Auth = () => {
  return (
    <div className={styles.container}>
      <h1>Auth page</h1>
      <div className={styles['button-container']}>
        <button className={styles.button}>Login</button>
        <button className={styles.button}>Sign Up</button>
      </div>
    </div>
  );
};

export default Auth;
