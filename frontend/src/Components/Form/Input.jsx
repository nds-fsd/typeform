import { forwardRef } from 'react';

const Input = forwardRef(({ error, label, type = 'text', ...rest }, ref) => {
  return (
    <>
      {label && (
        <label htmlFor='name' className='block text-sm font-medium text-gray-900 '>
          {label}
        </label>
      )}
      <input
        type={type}
        className='w-full text-4xl outline-none resize-none rounded-md p-2 bg-transparent hover:bg-white/20 border border-transparent focus:border-gray-900 transition duration-500'
        ref={ref}
        {...rest}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
});

export default Input;