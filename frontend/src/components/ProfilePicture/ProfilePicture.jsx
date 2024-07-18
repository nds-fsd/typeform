import React from 'react'

export const ProfilePicture = ({ imageUrl }) => {
  return (
    <div>
      <img
        id="profile_picture_example"
        alt="Tailwind CSS Navbar component"
        className={'border rounded-3xl'}
        src={imageUrl ? imageUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
    </div>
  )
}

export default ProfilePicture