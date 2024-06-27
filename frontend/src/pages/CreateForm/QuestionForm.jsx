import React, { useEffect, useRef, useContext } from 'react';
import QuestionChoices from './QuestionChoices';
import { useCustomFormProvider } from '../../context/FormContext';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import TextareaAutoSize from 'react-textarea-autosize';
import YesNoChoices from './YesNoChoices.jsx';

const QuestionForm = () => {
    const { activeQuestion, watch, setValue } = useCustomFormProvider();

    const type = watch(`questions.${activeQuestion}.type`);

    const hasChoices = ['MultipleChoiceQuestion', 'SingleChoiceQuestion'].includes(type);
    return (
        <main className='flex flex-col gap-1 flex-1 h-full items-center justify-center '>
            <div className='bg-white p-20 rounded-3xl shadow-md min-h-[400px] w-2/3 flex flex-col justify-center items-center gap-2'>
                <TextareaAutoSize
                    className='w-full text-2xl outline-none resize-none'
                    placeholder='Your question here'
                    value={watch(`questions.${activeQuestion}.text`)}
                    onChange={(e) => setValue(`questions.${activeQuestion}.text`, e.target.value)}
                />

                <TextareaAutoSize
                    className='w-full text-xl outline-none resize-none'
                    placeholder='Description (optional)'
                    value={watch(`questions.${activeQuestion}.description`)}
                    onChange={(e) => setValue(`questions.${activeQuestion}.description`, e.target.value)}
                />
                {type === 'TextQuestion' && (
                    <div className='mt-2 text-2xl w-full text-gray-300 border-b-2 border-gray-300'>Type your answer here</div>
                )}
                {hasChoices && <QuestionChoices />}
                {type === 'YesNoQuestion' && <YesNoChoices />}
            </div>
        </main>
    );
};

export default QuestionForm;
