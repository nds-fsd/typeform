import { useNavigate } from 'react-router-dom';
import FormCard from '../CreateForm/FormCard';
import style from './Workspace.module.css';
import { useFormProvider } from '../../context/FormContext';

const Workspace = () => {
  const navigate = useNavigate();
  const { allForms, setSelectedQuestion, setCurrentForm } = useFormProvider();
  // console.log(allForms)

  const handleCreate = () => {
    setCurrentForm(undefined)
    setSelectedQuestion(undefined);
    navigate('/createform')
  };

  return (
    <div className={style.viewport}>
      <h1>My Workspace</h1>
      <div className={style.frame}>
        <button className={style.btn} onClick={() => handleCreate()}>
          create new form
        </button>
        {allForms && allForms.length > 0 ? (
          allForms.map((form) => (
            <FormCard key={form._id} form={form} className={style.formcard} />
          ))
        ) : (
          <p>No forms available</p>
        )}
      </div>
    </div >
  );
};

export default Workspace;