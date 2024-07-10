import { forwardRef } from 'react';

const Input = forwardRef(({ error, label, type = 'text', ...rest }, ref) => {
  return (
    <>
      {label && (
        <label htmlFor='name' className='block text-sm font-medium text-gray-900 font-space mono'>
          {label}
        </label>
      )}
      <input
        type={type}
        className='font-space mono mt-1 block w-full px-3 py-2 bg-transparent hover:bg-white/20 border border-transparent
            rounded-md focus:outline-none focus:ring-blue-500 focus:border-gray-900 sm:text-sm'
        ref={ref}
        {...rest}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
});

export default Input;