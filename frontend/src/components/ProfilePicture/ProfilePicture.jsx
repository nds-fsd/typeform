import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

export const ProfilePicture = ({ imageUrl }) => {
  return (
    <div>
      {imageUrl ? (
        <img
          id="profile_picture_example"
          alt="Tailwind CSS Navbar component"
          className={'border rounded-3xl mt-8'}
          src={imageUrl}
        />
      ) : (
        <FaUserCircle className={'text-4xl mt-8'} />
      )}
    </div>
  );
}

export default ProfilePicture;
