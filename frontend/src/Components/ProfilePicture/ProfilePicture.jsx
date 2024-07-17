import React from 'react'

export const ProfilePicture = ({ imageUrl }) => {
  console.log('image url:', imageUrl);
  return (
    <div>
        <img id="lksdjjalskd" alt="Tailwind CSS Navbar component" 
        src={imageUrl} />
    </div>
  )
}

export default ProfilePicture