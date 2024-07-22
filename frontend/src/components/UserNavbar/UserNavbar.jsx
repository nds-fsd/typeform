import UserGreeting from './UserGreeting';
import UsernamesWorkspace from './UsernamesWorkspace';
import ProfileIcon from '../Profile/Profile';
import { useParams } from 'react-router-dom';
import ShareButton from '../DropDown/ShareButton';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Modal/ConfirmationModal';
import { useState } from 'react';
import SmallButton from '../Buttons/SmallButton';
import { handleDeleteForm } from '../../utils/api';

const UserNavbar = ({ isCreateMode, showProfileIcon = true }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);


    const confirmDelete = (id) => {
        handleDeleteForm(id);
        setIsModalOpen(false);
        navigate('/workspace')
    };

    return (
        <div className='flex items-center min-w-screen pb-2 px-20 pt-10 border-gray-800 bg-white/30 justify-between top-0'>
            <UsernamesWorkspace />
            <div className={'flex align-right items-center justify-evenly gap-6'}>
                <UserGreeting />
                {isCreateMode && (
                    <div className='flex gap-2'>
                        <ShareButton formId={id} className='bg-transparent border-black border' />
                        <SmallButton className='bg-transparent border-black border' text='Results' onClick={() => { navigate(`/formAnswers?form=${id}`) }} />
                        <SmallButton className='bg-transparent border-black border' text='Delete' onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                )}
                <ConfirmationModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title='Confirm Deletion'
                    description='Are you sure you want to delete the form?'
                    onConfirm={() => confirmDelete(id)}
                    textOnClose='Cancel'
                    textOnConfirm='Yes'
                />
                {showProfileIcon && (
                    <ProfileIcon accountSettingsId='accountSettings' profileIconId='profileIcon' />
                )}
            </div>
        </div>
    );
};

export default UserNavbar;