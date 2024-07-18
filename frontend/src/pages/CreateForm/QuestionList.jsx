import React, { useState } from 'react';
import QuestionCard from './QuestionCard.jsx';
import SmallButton from '../../components/Buttons/SmallButton.jsx';
import { useCustomFormProvider } from '../../context/FormContext.jsx';

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

  return (
    <div className='flex flex-col bg-white/50 items-center p-10 rounded-3xl w-full overflow-y-scroll shadow-md'>
      <ul className='w-full flex flex-col gap-1'>
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
      <SmallButton type='button' text='+ Add question' onClick={handleAddQuestion} />
    </div >
  );
};
