import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { api } from '../../utils/api.js';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import FormForm from './FormForm.jsx';
import { useFormProvider } from '../../context/FormContext.jsx';

export const CreateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentForm, setValue, resetForm } = useFormProvider();

  const isEditMode = !!id;
  console.log('edit mode?', isEditMode)

  useEffect(() => {
    if (isEditMode && currentForm) {
      setValue('title', currentForm.title || '');
      setValue('questions', currentForm.questions.map((question) => ({
        ...question,
        choices: question.choices || [],
      })) || []);
    } else {
      resetForm();
    }
  }, [setValue, currentForm]);

  const onSubmit = (data) => {
    if (isEditMode) {
      const processedData = {
        ...data,
        questions: data.questions.map(({ _id, ...rest }) => rest)
      };

      api().patch(`/form/${id}`, processedData).then((response) => {
        queryClient.invalidateQueries('forms');
        // alert('Form was just saved');
        // navigate('/workspace');
      }).catch((error) => {
        console.error('Failed to update form:', error);
      });
    } else {
      api().post('/form', data).then((response) => {
        queryClient.invalidateQueries('forms');
        alert('Form created');
        navigate('/workspace');
      }).catch((error) => {
        console.log('Failed to create form:', error);
      });
    }
  };

  return (
    <>
      <FormForm onSubmit={onSubmit} />
    </>
  );
};
