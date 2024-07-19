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
    <div className='flex flex-col gap-4 h-dvh w-screen bg-custom-gradient bg-cover md:bg-cover overflow-y-auto md:overflow-hidden'>
      <UserNavbar isCreateMode={true} />
      <Input type='text' placeholder='Form name' className='text-3xl px-20' {...register('title')} onBlur={handleSubmit(onSubmit)} />
      {!isLoading && (
        <form className='flex flex-col md:flex justify-between flex-grow py-16 h-10 overflow-y-auto md:overflow-hidden' onSubmit={handleSubmit(onSubmit)}>
          <div className='md:flex-row md:h-full h-6 flex flex-col md:gap-20 mb-18 justify-between mx-20 flex-grow pb-4'>
            {/* <QuestionOptions autoSave={handleSubmit(onSubmit)} /> */}
            <QuestionList autoSave={handleSubmit(onSubmit)} />
            <SmallButton text='SAVE' className='md:w-60 w-full h-[72px] absolute hover:bg-black hover:text-underline bottom-0 right-0 rounded-none md:rounded-2xl md:bottom-24 md:right-24' />
            <QuestionForm autoSave={handleSubmit(onSubmit)} />
          </div>
          {/* <footer className='fixed bottom-0 left-0 w-full flex justify-end px-4 py-4'>
            <SmallButton text='SAVE' className='w-full md:w-64 h-[64px] m-10 mb-6' />
          </footer> */}
          <ConfirmationModal
            open={blocker.state === 'blocked'}
            onClose={() => blocker.reset()}
            textOnClose='Cancel'
            textOnConfirm='Yes'
            description='Changes will be lost, do you wish to continue?'
            onConfirm={() => blocker.proceed()}
          />
        </form>
      )}
    </div>
  );
});

// import { useEffect, useState } from 'react';
// import { api } from '../../utils/api.js';
// import { useBlocker, useNavigate, useParams } from 'react-router-dom';
// import { QuestionList } from './QuestionList.jsx';
// import QuestionForm from './QuestionForm.jsx';
// import QuestionOptions from './QuestionOptions.jsx';
// import { useCustomFormProvider, withCustomFormProvider } from '../../context/FormContext.jsx';
// import { useForms } from '../../hooks/useForms.js';
// import { useQueryClient } from 'react-query';
// import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
// import { useFormState } from 'react-hook-form';
// import ConfirmationModal from '../../components/Modal/ConfirmationModal.jsx';
// import SmallButton from '../../components/Buttons/SmallButton.jsx';
// import Input from '../../components/Form/Input.jsx';

// export const CreateForm = withCustomFormProvider(() => {
//   const { id } = useParams();
//   const { forms, isLoading } = useForms();
//   const queryClient = useQueryClient();
//   const { handleSubmit, setValue, activeQuestion, watch, control, reset, fillEmptyChoiceLabels, activeIndex, register } = useCustomFormProvider();
//   const { dirtyFields, isDirty } = useFormState({ control, });

//   const choices = watch(`questions.${activeQuestion}.choices`);
//   const [initialChoices, setInitialChoices] = useState([]);

//   const type = watch(`questions.${activeQuestion}.type`);
//   const [initialType, setInitialType] = useState('');

//   const currentForm = forms?.find((form) => form._id === id);
//   const isEditMode = !!id && currentForm;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (currentForm) {
//       setInitialType(currentForm.questions[activeQuestion].type);
//       setInitialChoices(currentForm.questions[activeQuestion].choices || []);

//       setValue('title', currentForm.title || '');
//       setValue(
//         'questions',
//         currentForm.questions.map((question) => ({
//           ...question,
//           choices: question.choices || [],
//         })) || [],
//       );
//     }
//   }, [isEditMode, currentForm, setValue]);

//   const onSubmit = async (data) => {
//     data = fillEmptyChoiceLabels();
//     const res = await api().patch(`/form/${id}`, data);
//     reset(data);
//     setInitialChoices(res.data.questions[activeQuestion].choices);
//     queryClient.invalidateQueries('forms');
//   };

//   let blocker = useBlocker(({ currentLocation, nextLocation }) => {
//     const choicesChanged = JSON.stringify(choices) !== JSON.stringify(initialChoices);
//     const typeChanged = JSON.stringify(type) !== JSON.stringify(initialType);

//     return (Object.keys(dirtyFields).length > 0 || choicesChanged || typeChanged) &&
//       currentLocation.pathname !== nextLocation.pathname;
//   });

//   return (
//     <div className='flex flex-col h-dvh w-screen bg-custom-gradient bg-cover md:bg-cover overflow-y-auto md:overflow-hidden'>
//       <UserNavbar isCreateMode={true} />
//       <Input type='text' placeholder='Form name' className='text-3xl px-12' {...register('title')} onBlur={handleSubmit(onSubmit)} />
//       {!isLoading && (
//         <form className='flex flex-col md:flex justify-between flex-grow p-8 h-10 overflow-y-auto md:overflow-hidden' onSubmit={handleSubmit(onSubmit)}>
//           <div className='md:flex-row md:h-screen h-dvh flex flex-col border-4 justify-around flex-grow h-6'>
//             {/* <QuestionOptions autoSave={handleSubmit(onSubmit)} /> */}
//             <QuestionList autoSave={handleSubmit(onSubmit)} />
//             <SmallButton text='SAVE' className='md:w-60 w-full h-[68px] fixed bottom-0 right-0 rounded-none md:rounded-2xl md:bottom-8 md:right-8' />
//             <QuestionForm autoSave={handleSubmit(onSubmit)} />
//           </div>
//           {/* <footer className='fixed bottom-0 left-0 w-full flex justify-end px-4 py-4'>
//             <SmallButton text='SAVE' className='w-full md:w-64 h-[64px] m-10 mb-6' />
//           </footer> */}
//           <ConfirmationModal
//             open={blocker.state === 'blocked'}
//             onClose={() => blocker.reset()}
//             textOnClose='Cancel'
//             textOnConfirm='Yes'
//             description='Changes will be lost, do you wish to continue?'
//             onConfirm={() => blocker.proceed()}
//           />
//         </form>
//       )}
//     </div>
//   );
// });
// {/* <form className='flex flex-col md:flex-row justify-between flex-grow p-8 overflow-y-auto' onSubmit={handleSubmit(onSubmit)}>
//   <div className='md:flex-row flex flex-col border-4 justify-around flex-grow'></div> */}
