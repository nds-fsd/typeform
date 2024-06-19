import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { api } from '../../utils/api.js';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import FormForm from './FormForm.jsx';
import { useFormProvider } from '../../context/FormContext.jsx';

export const CreateForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    onEditForm,
    setOnEditForm,
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setIsEditMode,
    resetForm

  } = useFormProvider();
  console.log('edit mode?', isEditMode)

  // // ----- descubrir como hacer defaultValues aunque se usen 
  // // register, control etc desde FormProvider.
  // const {
  //   onEditForm,
  //   setOnEditForm
  // } = useFormProvider();

  // const { register, control, handleSubmit, watch, setValue } = useForm({
  //   defaultValues: isEditMode ? {} : {
  //     title: 'My form',
  //     questions: [{
  //       text: '...',
  //       type: 'TextQuestion'
  //     }]
  //   }
  // });

  // // ------

  useEffect(() => {
    if (isEditMode && onEditForm) {
      setValue('title', onEditForm.title || '');
      setValue('questions', onEditForm.questions.map((question) => ({
        ...question,
        choices: question.choices || [],
      })) || []);
    } else {
      resetForm();  // Reset the form to default values when creating a new form
    }
  }, [setValue]);

  const onSubmit = (data) => {
    if (isEditMode) {
      const processedData = {
        ...data,
        questions: data.questions.map(({ _id, ...rest }) => rest)
      };

      api().patch(`/form/${id}`, processedData).then((response) => {
        queryClient.invalidateQueries('forms');
        alert('Form was just saved');
        navigate('/workspace');
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
      <FormForm onSubmit={onSubmit} idForm={id} />
    </>
  );
};
