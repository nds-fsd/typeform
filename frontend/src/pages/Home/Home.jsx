import React from 'react';
import { Link } from 'react-router-dom';
import { getUserToken } from '../../utils/localStorage.js';

const Home = () => {
  const token = getUserToken();

  return (
    <div className='bg-custom-gradient min-h-screen flex items-center justify-center p-2'>
      <div className='bg-white/50 p-8 rounded-3xl shadow-md flex flex-col items-center w-full h-[90vh] mx-4'>
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='mb-36'>
            <img style={{ width: 318, height: 60 }} src='src/assets/Surflow logo@2x.png' alt='Surflow Logo' />
          </div>
          <h1 className=' text-gray-900 text-center text-3xl mb-24'>
            Are your surveys ready to <span className='text-gray-900 font-bold underline'>FLOW</span>?
          </h1>
          <Link to={token ? '/workspace' : '/login'}>
            <button
              className='w-80 text-gray-900 h-20 shadow-md bg-azure hover:bg-white
              hover:shadow-none hover:border hover:border-gray-600 rounded-3xl transition-all
              duration-300  scale-150'
            >
              <span className='font-bold'>Yes!</span> Let's do this!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
