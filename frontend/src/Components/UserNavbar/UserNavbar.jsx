import UserGreeting from './UserGreeting';
import UsernamesWorkspace from './UsernamesWorkspace';
import MyWorkspaceLink from './MyWorkspaceLink';
import ProfileIcon from '../Profile/Profile';
import { useParams } from 'react-router-dom';
import ShareButton from '../DropDown/ShareButton';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Modal/ConfirmationModal';
import { useState } from 'react';

const UserNavbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);


  const confirmDelete = (id) => {
    handleDelete(id);
    setIsModalOpen(false);
  };

  return (
    <div className='flex items-baseline min-w-screen p-8 pb-0 gap-8 border-gray-800'>
      <UsernamesWorkspace />
      {/* <MyWorkspaceLink /> */}
      {/* <UserGreeting /> */}
      <ShareButton formId={id} />
      <ProfileIcon accountSettingsId='accountSettings' profileIconId='profileIcon' />
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
      <ConfirmationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Confirm Deletion'
        description='Are you sure you want to delete the form?'
        onConfirm={confirmDelete(id)}
        textOnClose='Cancel'
        textOnConfirm='Yes'
      />
    </div>
  );
};

export default UserNavbar;

//         <div className="flex items-baseline min-w-screen p-8 pb-4 gap-8 border-b-2 border-gray-800">
