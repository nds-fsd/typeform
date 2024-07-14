import { useEffect, useState } from 'react';
import { api } from '../../utils/api.js';
import { useBlocker, useNavigate, useParams } from 'react-router-dom';
import { QuestionList } from './QuestionList.jsx';
import QuestionForm from './QuestionForm.jsx';
import { useCustomFormProvider, withCustomFormProvider } from '../../context/FormContext.jsx';
import QuestionOptions from './QuestionOptions.jsx';
import { useForms } from '../../hooks/useForms.js';
import { useQueryClient } from 'react-query';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useFormState } from 'react-hook-form';
import ConfirmationModal from '../../components/Modal/ConfirmationModal.jsx';
import SmallButton from '../../components/Buttons/SmallButton.jsx';

export const CreateForm = withCustomFormProvider(() => {
  const { id } = useParams();
  const { forms, isLoading } = useForms();
  const queryClient = useQueryClient();
  const { handleSubmit, setValue, getValues, activeQuestion, watch, control } = useCustomFormProvider();
  const { dirtyFields, touchedFields, isDirty } = useFormState({
    control,
  });
  const [openModal, setOpenModal] = useState(false);

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) => isDirty && currentLocation.pathname !== nextLocation.pathname,
  );

  console.log(blocker);

  const currentForm = forms?.find((form) => form._id === id);

  const questions = watch('questions');
  const choices = watch(`questions.${activeQuestion}.choices`);

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
    // data = fillEmptyChoices();
    if (isEditMode) {
      console.log(data);
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

  const handleDeleteClick = () => {
    if (dirtyFields?.questions) {
      setOpenModal(true);
    }
  };
  return (
    // <div className='bg-custom-gradient p-2 box-border h-screen'>

    <div className='flexm-0 h-screen min-w-screen overflow-y-auto bg-custom-gradient'>
      <SmallButton text='delete account' onClick={handleDeleteClick} />

      {/* <SmallButton text='delete account' onClick={() => { dirtyFields.questions && setOpenModal(true) }} /> */}

      {dirtyFields?.questions?.[activeQuestion]?.description && <p>Description field is dirty.</p>}

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

      <ConfirmationModal
        open={blocker.state === 'blocked'}
        onClose={() => blocker.reset()}
        textOnClose='cancel'
        textOnConfirm='yes'
        description='Changes will be lost, do you wish to continue?'
        // aqui debe salvar y redirect a cualquier ruta !== ruta actual
        onConfirm={() => blocker.proceed()}
      />
    </div>
  );
});
