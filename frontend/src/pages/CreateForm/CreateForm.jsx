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
  const { handleSubmit, setValue, getValues, activeQuestion, watch, control, reset, fillEmptyChoices, typeChanges, setTypeChanges } = useCustomFormProvider();
  const { dirtyFields, touchedFields, isDirty } = useFormState({
    control,
  });

  const [typeDirty, setTypeDirty] = useState(false);

  let blocker = useBlocker(({ currentLocation, nextLocation }) =>
    (Object.keys(dirtyFields)?.length > 0 || typeChanges.length > 0) &&
    currentLocation.pathname !== nextLocation.pathname,
  );

  // console.log(blocker, isDirty, dirtyFields);
  // console.log(typeDirty, 'typeDirty');
  console.log(typeChanges, 'typechanges list');
  const currentForm = forms?.find((form) => form._id === id);
  const questions = watch('questions');
  const choices = watch(`questions.${activeQuestion}.choices`);
  const type = watch(`questions.${activeQuestion}.type`);
  console.log(type)
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

  useEffect(() => {
    // Monitorar cambios en type para q sea dirty y bloquee navegacion
    if (type) {
      setTypeDirty(true);
    }
  }, [type]);

  const onSubmit = (data) => {
    data = fillEmptyChoices();
    if (isEditMode) {
      console.log(data);
      api()
        .patch(`/form/${id}`, data)
        .then((response) => {
          reset(data);
          setTypeDirty(false);
          setTypeChanges([]);

          queryClient.invalidateQueries('forms');
        });
    } else {
      api()
        .post('/form', data)
        .then((response) => {
          reset(data);
          setTypeDirty(false);
          setTypeChanges([]);
          queryClient.invalidateQueries('forms');
        });
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
    <div className='flexm-0 h-screen min-w-screen bg-custom-gradient'>
      {dirtyFields?.questions?.[activeQuestion]?.description && <p>Description field is dirty.</p>}
      {dirtyFields?.questions?.[activeQuestion]?.type && <p>type field is dirty.</p>}

      <UserNavbar showUserIcon={true} />
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
