import React from 'react'

export const LargeButton = ({ handleSubmit, text }) => {
  return (
    <div> 
        <button onClick={handleSubmit} className="w-80 h-20 shadow-md bg-azure hover:bg-white 
        hover:shadow-none hover:border hover:border-gray-600 rounded-4xl transition-all
        duration-300">{text}</button>
    </div>
  )
}
