import { handleDeleteForm } from '../../utils/api';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/DropDown/Dropdown';

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
    <div className={style.formgrid}>
      <div className={style.formcard} onClick={() => navigate(`/createform/${form._id}`)}>
        <div className=' top-3 right-3s'>
          <Dropdown form={form} handleDelete={handleDelete} />
        </div>
        <p>{form.title}</p>
        <div className='flex flex-row relative top-3 right-'></div>
      </div>
    </div>
  );
};

export default FormCard;
