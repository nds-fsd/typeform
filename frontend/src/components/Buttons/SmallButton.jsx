import React from 'react';
import { classNames } from '../../utils/utils';

const SmallButton = ({ text, className, ...rest }) => {
  return (
    <button
      className={classNames(
        'text-sm min-w-fit w-fit px-4 py-1 h-fit shadow-sm bg-azure hover:shadow-none transition-all duration-300 hover:bg-white rounded-4xl p-3  whitespace-nowrap',
        className
      )}
      {...rest}
    >
      {text}
    </button>
  );
};

export default SmallButton;