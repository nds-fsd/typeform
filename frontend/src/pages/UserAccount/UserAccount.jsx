import { Link, useNavigate, useParams } from 'react-router-dom';
import SmallButton from '../../components/Buttons/SmallButton.jsx';
import { FileInput } from '../../components/FileInput/FileInput.jsx';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { handleDeleteUser } from '../../utils/api.js';
import { useUserProvider } from '../../context/UserContext.jsx';
import { getUserSession, removeUserSession } from '../../utils/localStorage.js';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import DeleteUser from './DeleteUser.jsx';

const UserAccount = () => {
    const { userId, userEmail } = useUserProvider();

    return (
        <div className={'bg-custom-gradient bg-cover h-screen w-screen justify-center'}>
            <UserNavbar showProfileIcon={false} />
            <div className={'flex flex-col items-center gap-8'}>
                <h1>{userEmail}</h1>
                <SmallButton text='change password' onClick={() => console.log('should allow user to change password')} />
                <SmallButton text='change username' onClick={() => console.log('should allow user to change username')} />
                <DeleteUser />
                <FileInput />
                <div>
                    {/* <ProfileIcon /> */}
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
