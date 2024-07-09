import React from 'react'

export const SmallButton = ({ text, ...rest }) => {
  return (
    <>
      <button className="w-40 h-10 shadow-md bg-azure hover:bg-white
        hover:shadow-none hover:border hover:border-gray-600 rounded-4xl transition-all
        duration-300" {...rest}>{text}</button>
    </>
  )
}

