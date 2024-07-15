import { handleDeleteForm } from '../../utils/api';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import SmallButton from '../../components/Buttons/SmallButton';

const FormCard = ({ form }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDelete = (formId, event) => {
    event.stopPropagation();
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
      className={'w-60 h-40 flex items-center justify-center shadow-md rounded-3xl hover:shadow-none transition-all duration-300 font-space-mono hover:border-2 border-[#FC00B9]'}
      onClick={() => navigate(`/createform/${form._id}`)}>
      <p>{form.title}</p>
      <SmallButton text='X' onClick={(event) => handleDelete(form._id, event)} />
    </div>
  );
};

export default FormCard;