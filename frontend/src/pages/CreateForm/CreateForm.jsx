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
import Input from '../../components/Form/Input.jsx';

export const CreateForm = withCustomFormProvider(() => {
  const { id } = useParams();
  const { forms, isLoading } = useForms();
  const queryClient = useQueryClient();
  const { handleSubmit, setValue, activeQuestion, watch, control, reset, fillEmptyChoiceLabels, activeIndex, register } = useCustomFormProvider();
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
    <div className='flex flex-col m-0 h-dvh w-screen bg-custom-gradient bg-cover md:bg-cover overflow-y-auto md:overflow-hidden'>
      <UserNavbar isCreateMode={true} />
      {!isLoading && (
        <form className='flex justify-center md:flex-col flex-grow p-8 h-8 justify-center' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex justify-around flex-grow h-6'>
            <div className='flex flex-col w-4/12 gap-8 h-8'>
              <Input type='text' placeholder='Form name' className='text-3xl' {...register('title')} onBlur={handleSubmit(onSubmit)} />
              {/* <QuestionOptions autoSave={handleSubmit(onSubmit)} /> */}
              <QuestionList autoSave={handleSubmit(onSubmit)} />
              <SmallButton text='SAVE' className='w-full h-[64px] mt-8' />
            </div>
            <QuestionForm autoSave={handleSubmit(onSubmit)} />
          </div>
          {/* <footer className='fixed bottom-0 left-0 w-full flex justify-end px-4 py-4'>
            <SmallButton text='SAVE' className='w-full md:w-64 h-[64px] m-10 mb-6' />
          </footer> */}
          <ConfirmationModal
            open={blocker.state === 'blocked'}
            onClose={() => blocker.reset()}
            textOnClose='cancel'
            textOnConfirm='yes'
            description='Changes will be lost, do you wish to continue?'
            onConfirm={() => blocker.proceed()}
          />
        </form>
      )}


    </div>
  );
});
