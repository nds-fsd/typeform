import React from 'react'

export const ProfilePicture = ({ imageUrl }) => {
  console.log('image url:', imageUrl);
  return (
    <div>
      <img id="lksdjjalskd" alt="Tailwind CSS Navbar component" className={'border rounded-3xl mt-8'}
        src={imageUrl} />
    </div>
  )
}

export default ProfilePicture