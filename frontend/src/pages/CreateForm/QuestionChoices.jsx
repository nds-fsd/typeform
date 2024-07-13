import React, { useEffect, useState } from 'react';
import { useCustomFormProvider } from '../../context/FormContext.jsx';
import { classNames, toLetterAbbr } from '../../utils/utils.js';

const QuestionChoices = ({ index }) => {
  const { activeQuestion, watch, setValue, getValues, register } = useCustomFormProvider();
  const [activeIndex, setActiveIndex] = useState(null);

  const choices = watch(`questions.${activeQuestion}.choices`);
  const questionType = watch(`questions.${activeQuestion}.type`);

  const isSingleChoice = questionType === 'SingleChoiceQuestion';
  const color = questionType === 'SingleChoiceQuestion' ? 'green' : 'yellow';

  useEffect(() => {
    console.log('mudou tipo', questionType);

    if (!choices || choices.length === 0) {
      setValue(`questions.${activeQuestion}.choices`, [{ label: '' }, { label: '' }]);
    }
  }, [activeQuestion, questionType, choices]);

  const addChoice = () => {
    const currentChoices = getValues(`questions.${activeQuestion}.choices`);
    setValue(`questions.${activeQuestion}.choices`, [...currentChoices, { label: '' }]);
  };

  const removeChoice = (index) => {
    const currentQuestions = getValues(`questions.${activeQuestion}.choices`);
    const newQuestions = currentQuestions.filter((_, i) => i !== index);
    setValue(`questions.${activeQuestion}.choices`, newQuestions);
  };



  return (
    <>
      {choices?.map((choice, index) => (
        <div className='relative' key={choice.id}>
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
              className='outline-none bg-transparent pl-2 z-1'
              placeholder={`Choice ${toLetterAbbr(index + 1)}`}
              value={choice.label}
              onChange={(e) => {
                setValue(`questions.${activeQuestion}.choices.${index}.label`, e.target.value);
              }}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
            />
          </div>
          {choices.length > 2 && activeIndex === index && (
            <button
              type='button'
              className='z-5 btn btn-square btn-sm absolute right-[-40px] top-[1px]'
              onMouseDown={(e) => e.preventDefault()}
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

// // functional version (from TYP-30):
// const QuestionChoices = ({ register, control, index }) => {
//     const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
//         control,
//         name: `questions[${index}].choices`
//     });

//     return (
//         <div>
//             {fields.map((choice, choiceIndex) => (
//                 <div className={styles.questionChoice} key={choice.id} >
//                     <input id={styles.inputChoice} type="text" {...register(`questions[${index}].choices[${choiceIndex}].label`)} />
//                     <button type="button" onClick={() => remove(choiceIndex)}>x</button>
//                 </div>
//             ))
//             }
//             <button type="button" onClick={() => append({})}>Add Choice</button>
//         </div >
//     )
// }

