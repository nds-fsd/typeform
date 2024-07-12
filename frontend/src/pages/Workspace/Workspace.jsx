import { useNavigate } from 'react-router-dom';
import FormCard from '../CreateForm/FormCard.jsx';
import { useForms } from '../../hooks/useForms.js';
import ProfileIcon from '../../components/Profile/Profile.jsx';
import { emptyWorkspaceMessage } from '../../utils/utils.js';
import { useEffect } from 'react';
import { getUserSession } from '../../utils/localStorage.js';
import { useUserProvider } from '../../context/UserContext.jsx';
import SmallButton from '../../components/Buttons/SmallButton.jsx';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';


const Workspace = () => {
  const navigate = useNavigate();
  const { userName } = useUserProvider();

  const { forms } = useForms();
  const handleCreate = () => {
    navigate('/createform');
  };

  useEffect(() => {
    console.log(getUserSession().email)
  }, [])

  return (
    <div className="flexm-0 min-h-screen min-w-screen overflow-y-auto bg-grainy bg-cover min-h-screen">
      < UserNavbar showUserIcon={true} />
      <div className='sm:flex md:flex-col  bg-neutral-100/25 m-0 rounded-2xl gap-8 h-max p-8'>
        <SmallButton text='create new form' onClick={() => handleCreate()} />
        <div className='grid grid-cols-4 grid-flow-row gap-8'>
          {forms && forms.length > 0 ? (
            forms.map((form) => <FormCard key={form._id} form={form} />)
          ) : (
            <p>{emptyWorkspaceMessage}</p>
          )}
          <ProfileIcon accountSettingsId='accountSettings' profileIconId='profileIcon' />
        </div>
      </div>
    </div >
  );
};

export default Workspace;