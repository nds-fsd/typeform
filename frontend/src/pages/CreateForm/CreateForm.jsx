import { useEffect, useState } from 'react';
import { api } from '../../utils/api.js';
import { useBlocker, useNavigate, useParams } from 'react-router-dom';
import { QuestionList } from './QuestionList.jsx';
import QuestionForm from './QuestionForm.jsx';
import QuestionOptions from './QuestionOptions.jsx';
import { useCustomFormProvider, withCustomFormProvider } from '../../context/FormContext.jsx';
import { useForms } from '../../hooks/useForms.js';
import { useQueryClient } from 'react-query';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { useFormState } from 'react-hook-form';
import ConfirmationModal from '../../components/Modal/ConfirmationModal.jsx';
import SmallButton from '../../components/Buttons/SmallButton.jsx';

export const CreateForm = withCustomFormProvider(() => {
  const { id } = useParams();
  const { forms, isLoading } = useForms();
  const queryClient = useQueryClient();
  const { handleSubmit, setValue, activeQuestion, watch, control, reset, fillEmptyChoiceLabels, activeIndex } = useCustomFormProvider();
  const { dirtyFields, isDirty } = useFormState({ control, });

  const choices = watch(`questions.${activeQuestion}.choices`);
  const [initialChoices, setInitialChoices] = useState([]);

  const type = watch(`questions.${activeQuestion}.type`);
  const [initialType, setInitialType] = useState('');

  const currentForm = forms?.find((form) => form._id === id);
  const isEditMode = !!id && currentForm;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentForm) {
      setInitialType(currentForm.questions[activeQuestion].type);
      setInitialChoices(currentForm.questions[activeQuestion].choices || []);

      setValue('title', currentForm.title || '');
      setValue(
        'questions',
        currentForm.questions.map((question) => ({
          ...question,
          choices: question.choices || [],
        })) || [],
      );
    }
  }, [isEditMode, currentForm, setValue]);

  const onSubmit = async (data) => {
    data = fillEmptyChoiceLabels();
    const res = await api().patch(`/form/${id}`, data);
    reset(data);
    setInitialChoices(res.data.questions[activeQuestion].choices);
    queryClient.invalidateQueries('forms');
  };

  let blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const choicesChanged = JSON.stringify(choices) !== JSON.stringify(initialChoices);
    const typeChanged = JSON.stringify(type) !== JSON.stringify(initialType);

    return (Object.keys(dirtyFields).length > 0 || choicesChanged || typeChanged) &&
      currentLocation.pathname !== nextLocation.pathname;
  });

  return (
    <div className='flexm-0 h-screen min-w-screen bg-custom-gradient'>
      <UserNavbar isCreateMode={true} />
      {!isLoading && (
        <form className='h-full' onSubmit={handleSubmit(onSubmit)}>
          <SmallButton text='save' />
          <div className='flex h-full p-2'>
            <QuestionList autoSave={handleSubmit(onSubmit)} />
            <QuestionForm autoSave={handleSubmit(onSubmit)} />
            <QuestionOptions autoSave={handleSubmit(onSubmit)} />
          </div>
        </form>
      )}
      <ConfirmationModal
        open={blocker.state === 'blocked'}
        onClose={() => blocker.reset()}
        textOnClose='cancel'
        textOnConfirm='yes'
        description='Changes will be lost, do you wish to continue?'
        onConfirm={() => blocker.proceed()}
      />
    </div>
  );
});
