import { useNavigate } from 'react-router-dom';
import FormCard from '../CreateForm/FormCard.jsx';
import style from './Workspace.module.css';
import { useForms } from '../../hooks/useForms.js';
import ProfileIcon from '../../components/Profile/Profile.jsx';
import { emptyWorkspaceMessage } from '../../utils/utils.js';
import { useEffect } from 'react';
import { getUserSession } from '../../utils/localStorage.js';
import { useUserProvider } from '../../context/UserContext.jsx';


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
    <div className={style.viewport}>
      <h1>My Workspace</h1>
      <h2>Hi, {userName}</h2>
      <div className={style.frame}>
        <button className={style.btn} onClick={() => handleCreate()}>
          create new form
        </button>
        {forms && forms.length > 0 ? (
          forms.map((form) => <FormCard key={form._id} form={form} className={style.formcard} />)
        ) : (
          <p>{emptyWorkspaceMessage}</p>
        )}
        <ProfileIcon accountSettingsId='accountSettings' profileIconId='profileIcon' />
      </div>
    </div>
  );
};

export default Workspace;