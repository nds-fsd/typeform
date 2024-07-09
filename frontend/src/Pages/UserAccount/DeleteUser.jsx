import { useNavigate, useParams } from "react-router-dom";
import { useUserProvider } from "../../context/UserContext";
import { useState } from "react";
import { SmallButton } from "../../components/Buttons/SmallButton";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const DeleteUser = () => {
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
            <SmallButton text={'delete account'} onClick={() => setIsOpen(true)} />
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

export default DeleteUser;