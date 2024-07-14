import { useEffect } from 'react';
import { api } from '../../utils/api.js';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionList } from './QuestionList.jsx';
import QuestionForm from './QuestionForm.jsx';
import { useCustomFormProvider, withCustomFormProvider } from '../../context/FormContext.jsx';
import QuestionOptions from './QuestionOptions.jsx';
import { useForms } from '../../hooks/useForms.js';
import { useQueryClient } from 'react-query';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { useBlocker } from 'react-router-dom';


export const CreateForm = withCustomFormProvider(() => {
  const { id } = useParams();
  const { forms, isLoading } = useForms();
  const queryClient = useQueryClient();
  const { handleSubmit, setValue, getValues, activeQuestion, watch } = useCustomFormProvider();
  const currentForm = forms?.find((form) => form._id === id);

  const questions = watch('questions');
  const choices = watch(`questions.${activeQuestion}.choices`)

  const isEditMode = !!id && currentForm;
  const navigate = useNavigate();
  // console.log(questions, 'questions');

  useEffect(() => {
    if (isEditMode) {
      setValue('title', currentForm.title || '');
      setValue(
        'questions',
        currentForm.questions.map((question) => ({
          ...question,
          choices: question.choices || [],
        })) || [],
      );
    }
  }, [isEditMode, currentForm]);

  const onSubmit = (data) => {
    console.log('worked')
    // data = fillEmptyChoices();
    if (isEditMode) {
      console.log(data)
      api()
        .patch(`/form/${id}`, data)
        .then((response) => {
          queryClient.invalidateQueries('forms');
          // queryClient.invalidateQueries('forms').then(() => window.location.href = '/workspace');
          // queryClient.invalidateQueries('forms').then(() => navigate('/workspace'));
        });
    } else {
      api()
        .post('/form', data)
        .then((response) => {
          queryClient.invalidateQueries('forms');
          // queryClient.invalidateQueries('forms').then(() => navigate('/workspace'));
        });
    }
  };
  return (
    // <div className='bg-custom-gradient p-2 box-border h-screen'>
    <div className='flexm-0 h-screen min-w-screen overflow-y-auto bg-custom-gradient'>

      <UserNavbar showUserIcon={true} />
      {!isLoading && (
        // <form className='h-full' onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onSubmit)}>
        <form className='h-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex h-full p-2'>
            <QuestionList autoSave={handleSubmit(onSubmit)} />
            <QuestionForm autoSave={handleSubmit(onSubmit)} />
            <QuestionOptions autoSave={handleSubmit(onSubmit)} />
          </div>
        </form>
      )}
    </div>
  );
});
