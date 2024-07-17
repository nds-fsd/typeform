import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserProvider } from '../../context/UserContext';
import { getUserSession, removeUserSession } from '../../utils/localStorage';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { useQuery } from 'react-query';
import { fetchUserData } from '../../utils/api';


const ProfileIcon = ({ accountSettingsId, profileIconId }) => {
  const navigate = useNavigate();
  const { userId, userName } = useUserProvider();

  useEffect(() => {
    console.log(getUserSession().email, 'email de getUsersession desde Profile');
    console.log(userId, 'id recibido desde el contexto')

  }, []);

  const { data: user } = useQuery(
    ['user', userId],
    () => fetchUserData(userId),
    { retry: false }
  );


  const handleLogout = () => {
    removeUserSession();
    console.log(userName, 'logged out!')
    navigate('/login')
  }

  return (
    <div className="flex items-center justify-center gap-3 dropdown dropdown-end scale-150 pl-6 pr-6">
      <h2>Hi, {userName}</h2>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
        <ProfilePicture imageUrl={user?.profilePicture} />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        {/* <li>
          <Link to={'/profile'} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li> */}
        <li>
          <Link to={`/user/${userId}/account`} id={accountSettingsId}>
            Settings
          </Link>
        </li>
        <li>
          <button onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ProfileIcon;
