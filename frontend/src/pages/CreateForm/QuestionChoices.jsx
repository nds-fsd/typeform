import React, { useEffect } from 'react';
import { useCustomFormProvider } from '../../context/FormContext';
import { classNames, toLetterAbbr } from '../../utils/utils.js';

const QuestionChoices = ({ index }) => {
  const { activeQuestion, watch, setValue, getValues } = useCustomFormProvider();

  const choices = watch(`questions.${activeQuestion}.choices`);

  const questionType = watch(`questions.${activeQuestion}.type`);

  useEffect(() => {
    if (!choices) {
      setValue(`questions.${activeQuestion}.choices`, [{ label: '' }]);
    }
  }, [choices]);

  const addChoice = () => {
    const currentQuestions = getValues(`questions.${activeQuestion}.choices`);
    setValue(`questions.${activeQuestion}.choices`, [...currentQuestions, { label: '' }]);
  };

  const removeChoice = (index) => {
    const currentQuestions = getValues(`questions.${activeQuestion}.choices`);
    const newQuestions = currentQuestions.filter((_, i) => i !== index);
    setValue(`questions.${activeQuestion}.choices`, newQuestions);
  };

  const isSingleChoice = questionType === 'SingleChoiceQuestion';

  const color = questionType === 'SingleChoiceQuestion' ? 'green' : 'yellow';

  return (
    <>
      {choices?.map((choice, index) => (
        <div className='relative'>
          <div
            key={index}
            className={classNames(
              `border px-2 py-1 rounded-lg flex items-center`,
              isSingleChoice ? 'bg-purple-100 border-purple-300' : 'bg-yellow-100 border-yellow-300',
            )}
          >
            <span
              className={classNames(
                `border  w-6 h-6 flex items-center justify-center`,
                isSingleChoice ? 'border-purple-300' : 'border-yellow-300',
              )}
            >
              {toLetterAbbr(index + 1)}
            </span>
            <input
              type='text'
              className='outline-none bg-transparent pl-2'
              value={choice.label}
              onChange={(e) => {
                setValue(`questions.${activeQuestion}.choices.${index}.label`, e.target.value);
              }}
            />
          </div>
          {index > 0 && (
            <button
              type='button'
              className='btn btn-square btn-sm absolute right-[-40px] top-[1px]'
              onClick={() => removeChoice(index)}
            >
              X
            </button>
          )}
        </div>
      ))}
      <button type='button' className='btn btn-primary btn-sm' onClick={addChoice}>
        Add Choice
      </button>
    </>
  );
};

export default QuestionChoices;
