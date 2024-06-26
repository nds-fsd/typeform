import React from 'react'

export const MediumButton = ({ onClick, text }) => {
  return (
    <> 
    <button onClick={onClick} className="w-60 h-14 text-gray-900 shadow-md bg-azure hover:bg-white 
        hover:shadow-none hover:border hover:border-gray-600 rounded-4xl transition-all
        duration-300 font-space mono">{text}</button>
    </>
  )
}

