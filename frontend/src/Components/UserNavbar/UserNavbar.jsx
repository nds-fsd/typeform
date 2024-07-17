import UserGreeting from './UserGreeting';
import UsernamesWorkspace from './UsernamesWorkspace';
import MyWorkspaceLink from './MyWorkspaceLink';
import ProfileIcon from '../Profile/Profile';
import { useParams } from 'react-router-dom';
import ShareButton from '../DropDown/ShareButton';

const UserNavbar = () => {
  const { id } = useParams();
  return (
    <div className="flex items-center justify-between m-8 rounded-xl bg-white min-w-screen p-5 gap-8 border-gray-800">
        <UsernamesWorkspace />
        {/* <MyWorkspaceLink /> */}
        {/* <UserGreeting /> */}
        <div className="flex-1"></div>
      
        <ShareButton formId={id} publishBtnClass={'w-60 h-14 text-gray-900 shadow-md bg-azure hover:bg-white hover:shadow-none rounded-4xl transition-all duration-300 font-space-mono'} />
        <ProfileIcon accountSettingsId='accountSettings' profileIconId='profileIcon' />
      </div>
    
  );
};

export default UserNavbar;


