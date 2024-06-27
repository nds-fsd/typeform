import { forwardRef } from 'react';

const Input = forwardRef(({ error, label, ...rest }, ref) => {
  return (
    <>
      {label && (
        <label htmlFor='name' className='block text-sm font-medium text-gray-900 font-space mono'>
          {label}
        </label>
      )}
      <input
        className=' font-space mono mt-1 block w-full px-3 py-2 bg-white border border-gray-300
            rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
        ref={ref}
        {...rest}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
});

export default Input;
