import React from 'react'

export const LargeButton = ({ submit, text }) => {
  return (
    <> 
        <button onClick={submit} className="w-80 text-gray-900 h-20 shadow-md bg-azure hover:bg-white 
        hover:shadow-none hover:border hover:border-gray-600 rounded-4xl transition-all
        duration-300 font-rubik">{text}</button>
    </>
  )
}
