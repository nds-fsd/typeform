import React, { useState } from 'react';
import ShareButton from './ShareButton';
import { useNavigate } from 'react-router-dom';

const Dropdown = ({ form, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = (event) => {
    event.stopPropagation();

    setIsOpen(!isOpen);
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          type='button'
          className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          id='options-menu'
          aria-haspopup='true'
          aria-expanded={isOpen}
          onClick={toggleDropdown}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          onClick={handleMenuClick}
          className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10'
        >
          <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
            <ShareButton
              formId={form._id}
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
            />
            <button
              onClick={() => {
                navigate(`/formAnswers?form=${form._id}`);
                setIsOpen(false);
              }}
              className='font-semibold block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left'
            >
              Results
            </button>
            <button
              className='font-semibold block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left'
              onClick={(event) => {
                handleDelete(form._id, event);
                setIsOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
