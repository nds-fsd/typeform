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
          'flex border border-1 border-blue-100 p-2 rounded-md gap-6 w-full items-center',
          isSelected ? 'border-blue-500 font-semibold text-blue-700' : '',
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
          className='btn btn-square border-none btn-sm absolute right-[-40px] top-[4px] text-2xl text-black/30 bg-transparent hover:bg-azure hover:text-black'
          onClick={() => removeQuestion(index)}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default QuestionCard;
