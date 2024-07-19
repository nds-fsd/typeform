import { useCustomFormProvider } from '../../context/FormContext.jsx';
import { cloneElement, useCallback } from 'react';
import { questionTypes } from '../../constants/questionTypes.jsx';
import { classNames } from '../../utils/utils.js';

const QuestionCard = ({ question, index, onDragStart, onDragOver, onDrop }) => {
  const { setActiveQuestion, activeQuestion, removeQuestion } = useCustomFormProvider();
  const handleSelectQuestion = useCallback(() => {
    setActiveQuestion(index);
  }, [index, setActiveQuestion]);

  const isSelected = activeQuestion === index;

  const icon = questionTypes?.find((questionType) => questionType.value === question.type)?.icon;

  return (
    <div className='relative'>
      <li
        className={classNames(
          'flex border border-1 border-white/50 p-2 rounded-md gap-4 w-11/12 items-center',
          isSelected ? 'border-1 border-neutral-900 font-semibold' : '',
        )}
        draggable
        onDragStart={onDragStart}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={handleSelectQuestion}
      >
        {cloneElement(icon, { number: index + 1 })}
        <p className='truncate'>{question.text}</p>
      </li>
      {index > 0 && (
        <button
          type='button'
          className='btn btn-square border-none btn-sm absolute right-[-0px] top-[6px] text-2xl text-black/30 bg-transparent hover:bg-azure hover:text-black'
          onClick={() => removeQuestion(index)}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default QuestionCard;
