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

export const CreateForm = withCustomFormProvider(() => {
  const { id } = useParams();
  const { forms, isLoading } = useForms();
  const queryClient = useQueryClient();
  const { handleSubmit, setValue, getValues } = useCustomFormProvider();
  const currentForm = forms?.find((form) => form._id === id);

  const questionsFromGetValues = getValues('questions');

  const isEditMode = !!id && currentForm;
  const navigate = useNavigate();
  console.log(questionsFromGetValues)
  const fillEmptyChoices = () => {
    // const questions = getValues('questions');
    questionsFromGetValues.map((question, qIndex) => {
      question.choices.map((choice, cIndex) => {
        if (!choice.label) {
          console.log('no labels');

          setValue(`questions.${qIndex}.choices.${cIndex}.label`, `choice ${cIndex + 1}`);
        }
      });
    });
  };

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
    fillEmptyChoices();
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
    // <div className='bg-custom-gradient p-2 box-border h-screen'>
    <div className="flex flex-col" >

      <div className='flexm-0 min-h-screen w-screen overflow-auto bg-custom-gradient'>
        <UserNavbar showUserIcon={true} />
        {!isLoading && (
          <form className='h-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex shrink h-full p-8'>
              <QuestionList />
              <QuestionForm />
              <QuestionOptions />
            </div>
          </form>
        )}
      </div>
    </div>
  );
});
