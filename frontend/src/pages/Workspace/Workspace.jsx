import { useNavigate } from 'react-router-dom';
import FormCard from '../CreateForm/FormCard.jsx';
import { useForms } from '../../hooks/useForms.js';
import { emptyWorkspaceMessage } from '../../utils/utils.js';
import MediumButton from '../../components/Buttons/MediumButton.jsx';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { api } from '../../utils/api.js';
import { useCustomFormProvider, withCustomFormProvider } from '../../context/FormContext.jsx';
import { useQueryClient } from 'react-query';


const Workspace = withCustomFormProvider(() => {
  const { handleSubmit, reset } = useCustomFormProvider();
  const navigate = useNavigate();
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

  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-custom-gradient bg-cover">
      <UserNavbar isCreateMode={false} />
      <div className="flex-grow ml-10 m-6 flex-col p-4 px-8 bg-white/30 rounded-2xl overflow-hidden">
        <div className=" h-full overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Botão na primeira célula da grid */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-3">
              <MediumButton text="Create new form" onClick={handleSubmit(handleCreate)} />
            </div>
            <div className="col-span-1"></div>
            {forms && forms.length > 0 ? (
              forms.map((form) => (
                <FormCard key={form._id} form={form} />
              ))
            ) : (
              <p>{emptyWorkspaceMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Workspace;