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

function ConfirmNavigation({ blocker }) {
  if (blocker.state === "blocked") {
    return (
      <>
        <p style={{ color: "red" }}>
          Blocked the last navigation to {blocker.location.pathname}
        </p>
        <button onClick={() => blocker.proceed?.()}>Let me through</button>
        <button onClick={() => blocker.reset?.()}>Keep me here</button>
      </>
    );
  }
  return null;
}

export const CreateForm = withCustomFormProvider(() => {
  const { id } = useParams();
  const { forms, isLoading } = useForms();
  const queryClient = useQueryClient();
  const { handleSubmit, setValue, getValues, activeQuestion, watch, control } = useCustomFormProvider();
  const { dirtyFields, touchedFields } = useFormState({
    control
  });
  const [openModal, setOpenModal] = useState(false);
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      Object.keys(dirtyFields).length > 0 &&
      currentLocation.pathname !== nextLocation.pathname
  );

  const currentForm = forms?.find((form) => form._id === id);

  const questions = watch('questions');
  // const choices = watch(`questions.${activeQuestion}.choices`)

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

  const handleDeleteClick = () => {
    if (dirtyFields?.questions) {
      setOpenModal(true);
    }
  };

  const ConfirmNavigation = ({ blocker }) => {
    if (blocker.state === "blocked") {
      return (
        <>
          <p style={{ color: "red" }}>
            Blocked the last navigation to {blocker.location.pathname}
          </p>
          <button onClick={() => blocker.proceed?.()}>Let me through</button>
          <button onClick={() => blocker.reset?.()}>Keep me here</button>
        </>
      );
    }
    return null;

    if (blocker.state === "proceeding") {
      return (
        <p style={{ color: "orange" }}>Proceeding through blocked navigation</p>
      );
    }

    return <p style={{ color: "green" }}>Blocker is currently unblocked</p>;
  }
  return (
    // <div className='bg-custom-gradient p-2 box-border h-screen'>
    <div className='flexm-0 h-screen min-w-screen overflow-y-auto bg-custom-gradient'>
      <SmallButton text='delete account' onClick={handleDeleteClick} />
      {/* {dirtyFields?.questions?.[activeQuestion]?.description && <p>Description field is dirty.</p>} */}

      <UserNavbar showUserIcon={true} />
      {!isLoading && (
        <form className='h-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex h-full p-2'>
            <QuestionList autoSave={handleSubmit(onSubmit)} />
            <QuestionForm autoSave={handleSubmit(onSubmit)} />
            <QuestionOptions autoSave={handleSubmit(onSubmit)} />
          </div>
        </form>

      )}

      {openModal && (
        <ConfirmationModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          textOnClose='cancel'
          textOnConfirm='yes'
          description='Do you want to save your changes before leaving?'
          // aqui debe salvar y redireccionar a cualquier ruta !== ruta actual
          onConfirm={() => console.log('confirmed')}
        />
      )}
      {blocker ? <ConfirmNavigation blocker={blocker} /> : null}

    </div>
  );
});
