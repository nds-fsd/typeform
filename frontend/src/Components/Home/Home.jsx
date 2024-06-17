import React from 'react';
import { Link } from 'react-router-dom';
import style from './Home.module.css';

const Home = () => {
  return (
    <div className="bg-custom-gradient">    
      <div className={style.container}>
        <div className={style.welcome}>
          <div className={style.logo}>
            <img style={{width: 318, height: 60 }} src='src/Assets/Surflow logo@2x.png' alt="Surflow Logo" />
          </div>
          <div className='flex flex-col'>  
            <h1> Are your surveys ready to <span className={style.flow}>FLOW</span>? </h1>
            <Link to="/login">
              <button className="w-80 text-gray-900 h-20 shadow-md bg-azure hover:bg-white 
          hover:shadow-none hover:border hover:border-gray-600 rounded-4xl transition-all
          duration-300 font-space mono scale-150"><span className="font-bold">Yes!</span>, Let's do this!</button>
            </Link>
          </div>
        </div>
      </div>    
    </div>
  );
}

export default Home;