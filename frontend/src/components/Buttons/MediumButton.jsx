import React from 'react'

const MediumButton = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick} className="w-60 h-14 text-gray-900 shadow-md bg-azure hover:bg-white 
        hover:shadow-none border-2 border-gray-800 rounded-4xl transition-all
        duration-300 ">{text}</button>
    </>
  )
}

export default MediumButton