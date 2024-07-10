import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionCard from './QuestionCard.jsx';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Input from '../../components/ui/Input.jsx';
import { SmallButton } from '../../components/Buttons/SmallButton.jsx';
import { useCustomFormProvider } from '../../context/FormContext.jsx';

export const QuestionList = () => {
  const { swapQuestion, addQuestion, register, fields, watch } = useCustomFormProvider();
  const watchFieldArray = watch('questions');

  const questions = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const [draggedIndex, setDraggedIndex] = useState(null);
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleOnDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      swapQuestion(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAddQuestion = () => {
    addQuestion({ text: '', type: 'TextQuestion', description: '' });
  };

  return (
    <div className='bg-white p-14 rounded-3xl w-1/5 shadow-md'>
      <header className='flex flex-col gap-2'>
        <Link className='btn btn-ghost text-xl' to={'/workspace'}>
          My workspace
        </Link>
        <Input type='text' placeholder='Form name' {...register('title')} />
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
        <SmallButton type='button' onClick={handleAddQuestion}>
          + add question
        </SmallButton>
      </aside>
    </div>
  );
};
