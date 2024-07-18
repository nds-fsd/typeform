import React from 'react';
import { classNames } from '../../utils/utils';

const SmallButton = ({ text, className, ...rest }) => {
  return (
    <button
      className={classNames(
        'min-w-fit w-fit h-fit shadow-md bg-azure hover:shadow-none transition-all duration-300 hover:bg-white rounded-3xl p-3 text-xl',
        className
      )}
      {...rest}
    >
      {text}
    </button>
  );
};

export default SmallButton;