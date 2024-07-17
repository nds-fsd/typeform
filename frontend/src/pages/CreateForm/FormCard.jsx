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
      className='relative w-60 h-40 flex flex-col items-center justify-center shadow-md rounded-3xl hover:shadow-none transition-all duration-300 font-space-mono hover:border-2 border-[#FC00B9]'
      onClick={() => navigate(`/createform/${form._id}`)}
    >
      <div className='absolute top-2 right-2'>
        <Dropdown form={form} handleDelete={handleDelete} />
      </div>
      <p className='mt-6'>{form.title}</p>
      <div className='flex flex-row relative top-3 right-'></div>
    </div>
  );
};

export default FormCard;
