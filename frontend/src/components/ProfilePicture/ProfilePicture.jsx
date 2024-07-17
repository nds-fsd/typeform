import React from 'react'

export const ProfilePicture = ({ imageUrl }) => {
  return (
    <div>
      <img id="profile_picture_example" alt="Tailwind CSS Navbar component" className={'border rounded-3xl mt-8'}
        src={imageUrl} />
    </div>
  )
}

export default ProfilePicture