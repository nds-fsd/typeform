import React from 'react'

const SmallButton = ({ text, ...rest }) => {
  return (
    <>
      <button className="w-fit h-fit shadow-md bg-azure/80 hover:bg-[#F23C00]
        hover:shadow-none rounded-4xl transition-all
        duration-300  p-5" {...rest}>{text}</button>
    </>
  )
}

export default SmallButton
{/* <>
<button className="w-fit h-fit m-8 shadow-md bg-azure/80 hover:bg-white
  hover:shadow-none rounded-4xl transition-all
  duration-300  p-5" {...rest}>{text}</button>
</> */}