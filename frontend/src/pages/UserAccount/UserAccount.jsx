/* 
1. profile picture
2. edit profile picture button
3. change password button
4. delete account OK
*/
import { useNavigate } from 'react-router-dom';
import { SmallButton } from '../../components/Buttons/SmallButton.jsx';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { handleDeleteUser } from '../../utils/api.js';
import { useUserProvider } from '../../context/UserContext.jsx';
// importar user (name, email e picture) de un UserContext.

const DeleteUserDialog = () => {
    const { userName, userId, userEmail } = useUserProvider();
    console.log(userName, userId, userEmail);
    let [isOpen, setIsOpen] = useState(false);
    let [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isDeleted) {
            console.log('User was successfully deleted');
        }
    }, [isDeleted]);

    const handleConfirmDelete = () => {
        setIsOpen(false);
        setIsDeleted(true);
        console.log(userId, 'user id recebido desde el context')
        // console.log(isDeleted)
        // handleDeleteUser(userId);
        // navigate('/home')
    }

    return (
        <>
            <SmallButton type='button' onClick={() => setIsOpen(true)}>
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
                            <button onClick={handleConfirmDelete}>Yes, delete it!</button>
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
    const { userName, userId, userEmail } = useUserProvider();

    const navigate = useNavigate();

    return (
        <div>
            <h1>Hi, {userName}!</h1>
            <h2>{userEmail}</h2>
            <SmallButton type='button' onClick={console.log('should allow user to change password')}>
                change password
            </SmallButton>
            <DeleteUserDialog />
            <div>
                {/* <ProfileIcon /> */}
            </div>
        </div>
    );
};

export default UserAccount;
