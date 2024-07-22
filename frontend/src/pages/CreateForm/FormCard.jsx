import { handleDeleteForm } from '../../utils/api';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/DropDown/Dropdown';

const FormCard = ({ form }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDelete = (formId) => {
    deleteFormByIdMutation.mutate(formId);
  };

  const deleteFormByIdMutation = useMutation(['forms'], handleDeleteForm, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('forms');
      console.log('Form deleted successfully', data);
    },
    onError: (error) => {
      console.error('Error deleting form', error);
    },
  });

  return (
    <div
      className='relative h-32 text-sm flex flex-col justify-center flex-wrap p-4 shadow-sm rounded-3xl bg-azure hover:shadow-none transition-all duration-500 hover:bg-white'
      onClick={() => navigate(`/createform/${form._id}`)}
    >
      <div className='absolute top-2 right-2'>
        <Dropdown form={form} handleDelete={handleDelete} />
      </div>
      <p className='mt-6 overflow-auto'>{form.title}</p>
      <div className='flex flex-row relative top-3 right-'></div>
    </div>
  );
};

export default FormCard;
