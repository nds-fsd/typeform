import React from 'react';

const SmallButton = ({ text, ...rest }) => {
  return (
    <>
      <button
        className='min-w-fit w-20 h-fit shadow-md bg-azure/80 hover:shadow-none transition-all duration-100 hover:bg-gray-200/30
        rounded-2xl p-3'
        {...rest}
      >
        {text}
      </button>
    </>
  );
};

export default SmallButton;
{
  /* <>
<button className="w-fit h-fit m-8 shadow-md bg-azure/80 hover:bg-white
  hover:shadow-none rounded-4xl transition-all
  duration-300 p-5" {...rest}>{text}</button>
</> */
}
