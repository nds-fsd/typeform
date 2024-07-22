import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import SmallButton from '../../components/Buttons/SmallButton';
import { useUserProvider } from '../../context/UserContext';
import { api, fetchUserData } from '../../utils/api';
import { useQuery, useQueryClient } from 'react-query';
import { setUserSession } from '../../utils/localStorage';
import { handleUpdateUserName } from '../../utils/api';

const UpdateUserName = () => {
    const { userId, userName, setUserInContext } = useUserProvider();
    const [isOpen, setIsOpen] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [error, setError] = useState(null);

    const queryClient = useQueryClient();

    const { data: user, isLoading, isError, refetch } = useQuery(
        ['user', userId],
        () => fetchUserData(userId),
        { retry: false }
    );

    useEffect(() => {
        if (user?.name) {
            setNewUserName(user.name);
        }
    }, [user, isOpen]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Sorry, there is an error.</div>;
    }



    const handleSave = async () => {
        try {
            await handleUpdateUserName(userId, newUserName);
            queryClient.invalidateQueries(['user', userId]);
            setIsOpen(false);
        } catch (error) {
            setError('Failed to update username. Please try again.');
        }
    };

    return (
        <>
            <SmallButton text='Change Username' className='w-[250px]' onClick={() => setIsOpen(true)} />
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border rounded-3xl bg-azure p-8">
                        <DialogTitle className="font-bold text-2xl">Change Username</DialogTitle>
                        {error && <p className="text-red-500">{error}</p>}
                        <input
                            type="text"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter new username"
                        />
                        <div className="flex gap-4 justify-between pt-10">
                            <SmallButton text='Cancel' onClick={() => setIsOpen(false)} />
                            <SmallButton text='Save' onClick={handleSave} />
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default UpdateUserName;
