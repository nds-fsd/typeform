import { useEffect } from 'react';
import { api } from '../../utils/api.js';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionList } from './QuestionList.jsx';
import QuestionForm from './QuestionForm.jsx';
import { useCustomFormProvider, withCustomFormProvider } from '../../context/FormContext.jsx';
import QuestionOptions from './QuestionOptions.jsx';
import { useForms } from '../../hooks/useForms.js';
import { useQueryClient } from 'react-query';

export const CreateForm = withCustomFormProvider(() => {
  const { id } = useParams();
  const { forms, isLoading } = useForms();
  const queryClient = useQueryClient();
  const { handleSubmit, setValue } = useCustomFormProvider();
  const currentForm = forms?.find((form) => form._id === id);

  const isEditMode = !!id && currentForm;
  const navigate = useNavigate();

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
    if (isEditMode) {
      api()
        .patch(`/form/${id}`, data)
        .then((response) => {
          queryClient.invalidateQueries('forms').then(() => navigate('/workspace'));
        });
    } else {
      api()
        .post('/form', data)
        .then((response) => {
          queryClient.invalidateQueries('forms').then(() => navigate('/workspace'));
        });
    }
  };
  return (
    <div className='bg-custom-gradient p-2 box-border h-screen'>
      {!isLoading && (
        <form className='h-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex h-full'>
            <QuestionList />
            <QuestionForm />
            <QuestionOptions />
          </div>
        </form>
      )}
    </div>
  );
});
