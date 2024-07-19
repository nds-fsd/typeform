import React, { useState } from 'react';
import QuestionCard from './QuestionCard.jsx';
import SmallButton from '../../components/Buttons/SmallButton.jsx';
import { useCustomFormProvider } from '../../context/FormContext.jsx';
import { questionTypes } from '../../constants/questionTypes.jsx';
import { useMemo } from 'react';
import Select from '../../components/Form/Select.jsx';

export const QuestionList = () => {
  const { swapQuestion, addQuestion, setActiveQuestion, questions } = useCustomFormProvider();

  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      swapQuestion(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const handleAddQuestion = () => {
    // setIsOpen(true);
    addQuestion({ text: '', type: 'TextQuestion', description: '' });
    const newIndex = questions.length;
    setActiveQuestion(newIndex);
  };

  const { setValue, activeQuestion, watch } = useCustomFormProvider();

  const currentType = watch(`questions.${activeQuestion}.type`);
  const type = useMemo(() => questionTypes.find((questionType) => questionType.value === currentType), [currentType]);

  const options = questionTypes.map((questionType) => ({
    value: questionType.value,
    label: (
      <div className='flex gap-4'>
        {questionType.icon}
        {questionType.label}
      </div>
    ),
  }));

  const handleOnChangeType = (value) => {
    setValue(`questions.${activeQuestion}.type`, value);
  };

  return (
    <div>
      <div className='flex flex-col flexx-grow bg-white/50 gap-8 items-center p-12 rounded-3xl max-h-[500px] overflow-y-auto shadow-md'>
        <div className='w-full flex flex-col align-baseline max-w border-b-2 border-black pb-8'>
          <Select
            label='Question Type'
            value={options.find((option) => option.value === currentType)}
            onChange={(value) => handleOnChangeType(value)}
            options={options}
          />
        </div>
        <ul className='w-full gap-1'>
          {questions.map((question, index) => (
            <QuestionCard
              question={question}
              key={question.id}
              index={index}
              onDragStart={(e) => handleDragStart(e, index)}
              onDrop={(e) => handleOnDrop(e, index)}
              onDragOver={(e) => handleDragOver(e)}
            />
          ))}
        </ul>
      </div >
      <SmallButton type='button' text='+ Add question' onClick={handleAddQuestion} className='w-full mt-4' />
    </div>
  );
};
