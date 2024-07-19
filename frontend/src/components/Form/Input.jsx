import { forwardRef } from 'react';
import { classNames } from '../../utils/utils';

const Input = forwardRef(({ error, label, type = 'text', onBlur, className, ...rest }, ref) => {
  return (
    <>
      {label && (
        <label htmlFor='name' className='block text-sm font-medium text-gray-900 '>
          {label}
        </label>
      )}
      <input
        type={type}
        className={classNames(
          'w-full resize-none rounded-lg p-2 bg-transparent hover:bg-white/50 border border-black/10 focus:border-gray-900 outline-none transition duration-500',
          className
        )}
        ref={ref}
        onBlur={onBlur}
        {...rest}
      />
      {error && <p className='text-red-500'>{error}</p>}
    </>
  );
});

export default Input;