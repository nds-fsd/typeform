import { useNavigate } from 'react-router-dom';
import FormCard from '../CreateForm/FormCard';
import style from './Workspace.module.css';
import { useForms } from '../../hooks/useForms.js';
import { MediumButton } from '../../components/Buttons/MediumButton.jsx'
import ProfileIcon from '../../components/Profile/Profile.jsx';
import { emptyWorkspaceMessage } from '../../utils/utils.js';
import { useEffect } from 'react';
import { getUserSession } from '../../utils/localStorage.js';
import { useUserProvider } from '../../context/UserContext.jsx';


const Workspace = () => {
  const navigate = useNavigate();
  const { userName } = useUserProvider();

  const { forms } = useForms();
  console.log(forms)
  const handleCreate = () => {
    navigate('/createform');
  };

  useEffect(() => {
    console.log(getUserSession().email)
  }, [])

  return (
    <div className="bg-custom-gradient min-h-screen w-screen overflow-y-auto relative">
      <h1 className="text-gray-900 text-3xl mb-8 ml-8 mt-2">My Workspace</h1>
      <div className="m-5 bg-white p-5 rounded-2xl shadow-md relative pt-8">
        <div className='pl-8 pb-10'>  
          <MediumButton onClick={handleCreate} text='Create New Form' />
        </div>
    
      <div className="grid grid-cols-1 gap-4">     
        {forms && forms.length > 0 ? (
          forms.map((form) => <FormCard key={form._id} form={form} className={style.formcard} />)
        ) : (
          <p>{emptyWorkspaceMessage}</p>
        )}
      </div>
   
        <ProfileIcon accountSettingsId='accountSettings' profileIconId='profileIcon' />
      </div>
    </div>
  );
};

export default Workspace;