import React from 'react';
import { Link } from 'react-router-dom';
import style from './Home.module.css';

const Home = () => {
  return (
    <div className={style.background}>    
      <div className={style.container}>
        <div className={style.welcome}>
          <div className={style.logo}>
            <img style={{width: 318, height: 60 }} src='src/Assets/Surflow logo@2x.png' alt="Surflow Logo" />
          </div>
          <h1> Are your surveys ready to <span className={style.flow}>FLOW</span>? </h1>
          <Link to="/login">
            <button><span className={style.yes}>Yes!</span>, Let's do this!</button>
          </Link>
        </div>
      </div>    
    </div>
  );
}

export default Home;