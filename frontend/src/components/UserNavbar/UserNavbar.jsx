import UserGreeting from './UserGreeting';
import UsernamesWorkspace from './UsernamesWorkspace';
import ProfileIcon from '../Profile/Profile';
import { useParams } from 'react-router-dom';
import ShareButton from '../DropDown/ShareButton';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Modal/ConfirmationModal';
import { useState } from 'react';

const UserNavbar = ({ isCreateMode, showProfileIcon = true }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);


    const confirmDelete = (id) => {
        // handleDelete(id);
        setIsModalOpen(false);
    };

    return (
        <div className='flex items-baseline min-w-screen p-8 pb-0 gap-8 border-gray-800 border-b-2 justify-between'>
            <UsernamesWorkspace />
            {/* <UserGreeting /> */}
            {isCreateMode && (
                <div className={'flex align-right'}>
                    <ShareButton formId={id} publishBtnClass={"w-60 h-14 text-gray-900 shadow-md bg-azure hover:bg-white hover:shadow-none rounded-4xl transition-all duration-300"} />
                    <button
                        onClick={() => {
                            navigate(`/formAnswers?form=${id}`)
                        }}
                        className='font-semibold block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left'
                    >
                        Results
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='font-semibold block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
                    >
                        Delete
                    </button>
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
    );
};

export default UserNavbar;