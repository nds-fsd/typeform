/* 
1. profile picture
2. edit profile picture button
3. change password button
4. delete account OK
*/
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SmallButton } from '../../components/Buttons/SmallButton.jsx';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { handleDeleteUser } from '../../utils/api.js';
import { useUserProvider } from '../../context/UserContext.jsx';
import { getUserSession, removeUserSession } from '../../utils/localStorage.js';
import UserGreeting from '../../components/ui/UserGreeting.jsx';
// importar user (name, email e picture) de un UserContext.

const DeleteUserDialog = () => {
    const { id } = useParams();
    const { userName, userEmail } = useUserProvider();
    // console.log(userName, userId, userEmail);
    let [isOpen, setIsOpen] = useState(false);
    let [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate();

    const handleConfirmDelete = async (userId) => {
        try {
            console.log(userId, 'íd', typeof userId)
            await handleDeleteUser(id);
            removeUserSession();
            setIsDeleted(true);
            navigate('/home');
        } catch (error) {
            console.error('Error deleting user', error);
        }
        // console.log(isDeleted)
        // handleDeleteUser(userId);
        // removeUserSession();
        // navigate('/home')
    }

    return (
        <>
            <SmallButton id={'deleteAccountButton'} type='button' onClick={() => setIsOpen(true)}>
                delete my account
            </SmallButton>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                        <DialogTitle className="font-bold">delete my account</DialogTitle>
                        <Description>caution! this will permanently delete your account</Description>
                        <p>are you sure you want to delete your account? All of your data will be permanently removed.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setIsOpen(false)}>No, cancel</button>
                            <button id='confirmDeleteAccountButton' onClick={() => handleConfirmDelete()}>Yes, delete it!</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <Dialog open={isDeleted} onClose={() => navigate('/home')} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                        <DialogTitle className="font-bold">your account was successfully deleted :( bye</DialogTitle>
                        <div className="flex gap-4">
                            <button onClick={() => navigate('/home')}>ok</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
};

const UserAccount = () => {
    const { userId, userEmail } = useUserProvider();

    // const navigate = useNavigate();
    // useEffect(() => {
    //     console.log(getUserSession().email)

    // }, [])
    return (
        <div>
            <UserGreeting />
            <h2>{userEmail}</h2>
            <Link className='btn btn-ghost text-xl' to={'/workspace'}>
                My workspace
            </Link>
            <SmallButton type='button' onClick={() => console.log('should allow user to change password')}>
                change password
            </SmallButton>
            <SmallButton type='button' onClick={() => console.log('should allow user to change username')}>
                change username
            </SmallButton>
            <DeleteUserDialog />
            <div>
                {/* <ProfileIcon /> */}
            </div>
        </div>
    );
};

export default UserAccount;
