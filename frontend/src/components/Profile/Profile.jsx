import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserProvider } from '../../context/UserContext';
import { removeUserSession } from '../../utils/localStorage';

const ProfileIcon = ({ accountSettingsId, profileIconId }) => {
  const navigate = useNavigate();
  const { userId, userName } = useUserProvider();
  // console.log(userId, 'id recibido desde el contexto')

  const handleLogout = () => {
    removeUserSession();
    console.log(userName, 'logged out!')
    navigate('/login')
  }

  return (
    <div className="dropdown dropdown-end scale-150 absolute top-10 right-12">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img id={profileIconId} alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
