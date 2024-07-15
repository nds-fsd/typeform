import style from './FormCard.module.css';
import { handleDeleteForm } from '../../utils/api';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

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
      <div className="flex items-center justify-center jum-5 bg-white p-5 rounded-2xl shadow-md relative transition duration-300 ease-in-out transform hover:bg-gray-100" onClick={() => navigate(`/createform/${form._id}`)}>
        <p>{form.title}</p>
        <button className={style.deleteButton} onClick={(event) => handleDelete(form._id, event)}>
          X
        </button>
      </div>
    </div>
  );
};

export default FormCard;
