import { useNavigate, useParams } from "react-router-dom";
import { useUserProvider } from "../../context/UserContext";
import { useState } from "react";
import SmallButton from "../../components/Buttons/SmallButton";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const DeleteUser = () => {
    const { id } = useParams();
    const { userName, userEmail } = useUserProvider();
    let [isOpen, setIsOpen] = useState(false);
    let [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate();

    const handleConfirmDelete = async (userId) => {
        try {
            await handleDeleteUser(id);
            removeUserSession();
            setIsDeleted(true);
            navigate('/home');
        } catch (error) {
            console.error('Error deleting user', error);
        }
    }

    return (
        <>
            <SmallButton text='Delete account' className='w-[250px]' onClick={() => setIsOpen(true)} />
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border rounded-xl bg-white p-12">
                        <DialogTitle className="font-bold text-2xl">Delete account</DialogTitle>
                        <Description>Caution! this will permanently delete your account</Description>
                        <p>are you sure you want to delete your account? All of your data will be permanently removed.</p>
                        <div className="flex gap-4 justify-between pt-10">
                            <SmallButton className='text-lg' text='No, cancel' onClick={() => setIsOpen(false)} />
                            {/* <SmallButton className='text-lg bg-neutral-300' text='Yes, delete it!' id='confirmDeleteAccountButton' onClick={() => handleConfirmDelete()} /> */}
                            <SmallButton className='text-lg bg-neutral-900 text-white' text='Yes, delete it!' id='confirmDeleteAccountButton' onClick={() => handleConfirmDelete()} />

                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <Dialog open={isDeleted} onClose={() => navigate('/home')} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white/50 p-12">
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