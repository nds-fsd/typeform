import React from 'react'

export const FileInput = () => {
  return (
    <div>
        <div class="relative w-40 h-10">
  <input id="file-input" type="file" class="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" 
  accept="image/png, image/jpeg"/>
  <button type="button" class="w-full h-full shadow-md bg-azure hover:bg-white
            hover:shadow-none hover:border hover:border-gray-600 rounded-4xl transition-all
            duration-300">
    Change profile picture
  </button>
</div>
    </div>
  )
}

export default FileInput;