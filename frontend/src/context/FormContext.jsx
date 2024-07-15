import { createContext, useCallback, useContext, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toLetterAbbr } from '../utils/utils';


export const FormContext = createContext(null);

const defaultValues = {
  title: 'My Form',
  questions: [
    {
      text: '...',
      description: '',
      type: 'TextQuestion',
    },
  ],
  active: 0,
};

export const CustomFormProvider = ({ children }) => {
  const { register, control, watch, setValue, getValues, handleSubmit, formState, reset } = useForm({ defaultValues });
  const [typeChanges, setTypeChanges] = useState([]);

  console.log(typeChanges, 'type changes');
  const {
    fields,
    remove: removeQuestion,
    swap: swapQuestion,
    append: addQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });

  const activeQuestion = watch('active');
  const questions = watch('questions');

  const setActiveQuestion = (index) => {
    setValue('active', index);
  };

  const handleRemoveQuestion = useCallback(
    (index) => {
      if (activeQuestion === index) {
        setActiveQuestion(activeQuestion - 1);
      }
      removeQuestion(index);
    },
    [activeQuestion],
  );

  const fillEmptyChoices = () => {
    questions?.map((question, qIndex) => {
      question.choices?.map((choice, cIndex) => {
        // if (choice.label === '') {
        setValue(`questions.${qIndex}.choices.${cIndex}.label`, `Choice ${toLetterAbbr(cIndex + 1)}`);
        // }
      });
    });
    return getValues()
  };

  const value = {
    questions,
    activeQuestion,
    setActiveQuestion,
    register,
    control,
    addQuestion,
    removeQuestion: handleRemoveQuestion,
    swapQuestion,
    setValue,
    getValues,
    watch,
    handleSubmit,
    fields,
    fillEmptyChoices,
    reset,
    typeChanges,
    setTypeChanges
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useCustomFormProvider = () => useContext(FormContext);

export const withCustomFormProvider = (Component) => (props) => (
  <CustomFormProvider>
    <Component {...props} />
  </CustomFormProvider>
);