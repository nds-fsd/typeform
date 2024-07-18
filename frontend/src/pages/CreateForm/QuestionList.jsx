import React, { useState } from 'react';
import QuestionCard from './QuestionCard.jsx';
import Input from '../../components/Form/Input.jsx';
import SmallButton from '../../components/Buttons/SmallButton.jsx';
import { useCustomFormProvider } from '../../context/FormContext.jsx';

export const QuestionList = ({ autoSave }) => {
  const { swapQuestion, addQuestion, setActiveQuestion, register, questions } = useCustomFormProvider();

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
    setIsOpen(true);
    addQuestion({ text: '', type: 'TextQuestion', description: '' });
    const newIndex = questions.length;
    setActiveQuestion(newIndex);
  };

  return (
    <div className='bg-white/20 p-14 rounded-3xl w-1/5 shadow-md'>
      <header className='flex flex-col gap-2'>
        <Input type='text' placeholder='Form name' {...register('title')} onBlur={autoSave} />
        <h2 className='text-2xl'>Questions</h2>
      </header>
      <aside className='flex flex-col gap-2 items-center pt-2'>
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
        <SmallButton type='button' text='+ add question' onClick={handleAddQuestion} />
      </aside>
    </div >
  );
};
