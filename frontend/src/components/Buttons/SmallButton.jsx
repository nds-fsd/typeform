import React from 'react'

export const SmallButton = ({ text, ...rest }) => {
  return (
    <>
      <button className="w-fit h-fit m-8 shadow-md bg-azure/80 hover:bg-white
        hover:shadow-none rounded-4xl transition-all
        duration-300 font-space-mono p-5" {...rest}>{text}</button>
    </>
  )
}

