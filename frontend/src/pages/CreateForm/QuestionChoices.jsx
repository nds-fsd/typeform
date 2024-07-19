import { useEffect } from 'react';
import { useCustomFormProvider } from '../../context/FormContext.jsx';
import { classNames, toLetterAbbr } from '../../utils/utils.js';
import SmallButton from '../../components/Buttons/SmallButton.jsx';

const QuestionChoices = ({ autoSave }) => {
  const { activeQuestion, watch, setValue, getValues, register, fillEmptyChoiceLabels, control, activeIndex, setActiveIndex } = useCustomFormProvider();

  const choices = watch(`questions.${activeQuestion}.choices`);
  const questionType = watch(`questions.${activeQuestion}.type`);

  const isSingleChoice = questionType === 'SingleChoiceQuestion';

  useEffect(() => {
    if (!choices || choices.length === 0) {
      setValue(`questions.${activeQuestion}.choices`, [{ label: '' }, { label: '' }]);
    }
  }, [activeQuestion, questionType, choices]);

  const addChoice = () => {
    const currentChoices = getValues(`questions.${activeQuestion}.choices`);
    setValue(`questions.${activeQuestion}.choices`, [...currentChoices, { label: '' }]);
  };

  const removeChoice = (index) => {
    const currentChoices = getValues(`questions.${activeQuestion}.choices`);
    const newChoices = currentChoices.filter((_, i) => i !== index);
    setValue(`questions.${activeQuestion}.choices`, newChoices);
    fillEmptyChoiceLabels(newChoices);
    autoSave();
  };

  return (
    <>
      <div className='overflow-auto h-full w-full'>
        {choices?.map((choice, index) => (
          <div key={choice.id}>
            <div
              key={index}
              className={classNames(
                `border gap-4 rounded-lg flex items-center`,
                isSingleChoice ? 'bg-purple-100 border-purple-300' : 'bg-yellow-100 border-yellow-300',
              )}
            >
              <span
                className={classNames(
                  `border w-6 h-6 flex items-center justify-center`,
                  isSingleChoice ? 'border-purple-300' : 'border-yellow-300',
                )}
              >
                {toLetterAbbr(index + 1)}
              </span>
              <input
                type='text'
                className='outline-none bg-transparent pl-2 z-1 w-full'
                placeholder={`Choice ${toLetterAbbr(index + 1)}`}
                value={choice.label}
                {...register(`questions.${activeQuestion}.choices.${index}.label`)}
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
                className='z-5 btn btn-square btn-sm absolute right-[-40px] top-[1px] text-2xl text-black/30 bg-transparent hover:bg-azure hover:text-black'
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => removeChoice(index)}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <SmallButton type='button' text='+ Add choice' className='w-full mt-4' onClick={addChoice} />
    </>
  );
};


export default QuestionChoices;


