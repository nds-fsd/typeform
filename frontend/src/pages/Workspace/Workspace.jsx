import { useNavigate } from 'react-router-dom';
import FormCard from '../CreateForm/FormCard.jsx';
import { useForms } from '../../hooks/useForms.js';
import ProfileIcon from '../../components/Profile/Profile.jsx';
import { emptyWorkspaceMessage } from '../../utils/utils.js';
import { useEffect } from 'react';
import { getUserSession } from '../../utils/localStorage.js';
import { useUserProvider } from '../../context/UserContext.jsx';
import UserGreeting from '../../components/UserNavbar/UserGreeting.jsx';
import SmallButton from '../../components/Buttons/SmallButton.jsx';
import UsernamesWorkspace from '../../components/UserNavbar/UsernamesWorkspace.jsx';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { api } from '../../utils/api.js';
import { useCustomFormProvider, withCustomFormProvider } from '../../context/FormContext.jsx';
import { useQueryClient } from 'react-query';


const Workspace = withCustomFormProvider(() => {
  const { handleSubmit, reset } = useCustomFormProvider();

  const navigate = useNavigate();
  const { userName } = useUserProvider();

  const { forms } = useForms();
  const queryClient = useQueryClient();

  const handleCreate = (data) => {
    api()
      .post('/form', data)
      .then((response) => {
        if (response && response.data && response.data._id) {
          reset(data);
          queryClient.invalidateQueries('forms');
          navigate(`/createform/${response.data._id}`)
        } else {
          console.error('Form creation was successful but no ID was returned');
        }
      }).catch((error) => console.error('Error creating form:', error))
  };

  useEffect(() => {
    console.log(getUserSession().email)
  }, [])

  return (
    <div className="flexm-0 min-h-screen min-w-screen overflow-y-auto bg-custom-gradient bg-cover">
      < UserNavbar />
      <div className='flex bg-neutral-100/25 m-0 rounded-2xl gap-8 h-max p-8'>
        <SmallButton text='create new form' onClick={handleSubmit(handleCreate)} />
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
});

export default Workspace;