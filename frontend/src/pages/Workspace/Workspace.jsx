import { useNavigate } from 'react-router-dom';
import FormCard from '../CreateForm/FormCard';
import style from './Workspace.module.css';
import { useForms } from '../../hooks/useForms.js';
import ProfileIcon from '../../components/Profile/Profile.jsx';
import { emptyWorkspaceMessage } from '../../utils/utils.js';


const Workspace = () => {
  const navigate = useNavigate();

  const { forms } = useForms();
  const handleCreate = () => {
    navigate('/createform');
  };

  return (
    <div className={style.viewport}>
      <h1>My Workspace</h1>
      <div className={style.frame}>
        <button className={style.btn} onClick={() => handleCreate()}>
          create new form
        </button>
        {forms && forms.length > 0 ? (
          forms.map((form) => <FormCard key={form._id} form={form} className={style.formcard} />)
        ) : (
          <p>{emptyWorkspaceMessage}</p>
        )}
        <ProfileIcon />
      </div>
    </div>
  );
};

export default Workspace;
