/* 
1. profile picture
2. edit profile picture button
3. change password button
4. delete account OK
*/
import { Link, useNavigate, useParams } from 'react-router-dom';
import SmallButton from '../../components/Buttons/SmallButton.jsx';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { handleDeleteUser } from '../../utils/api.js';
import { useUserProvider } from '../../context/UserContext.jsx';
import { getUserSession, removeUserSession } from '../../utils/localStorage.js';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import DeleteUser from './DeleteUser.jsx';
// importar user (name, email e picture) de un UserContext.

const UserAccount = () => {
    const { userId, userEmail } = useUserProvider();

    // const navigate = useNavigate();
    // useEffect(() => {
    //     console.log(getUserSession().email)

    // }, [])
    return (
        <div>
            <UserNavbar />
            <h2>{userEmail}</h2>
            <SmallButton text='change password' onClick={() => console.log('should allow user to change password')} />
            <SmallButton text='change username' onClick={() => console.log('should allow user to change username')} />
            <DeleteUser />
            <div>
                {/* <ProfileIcon /> */}
            </div>
        </div>
    );
};

export default UserAccount;
