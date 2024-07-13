import React, { useEffect, useRef, useState } from 'react';
import QuestionChoices from './QuestionChoices.jsx';
import { useCustomFormProvider } from '../../context/FormContext.jsx';
import { useFormState } from 'react-hook-form';
import TextareaAutoSize from 'react-textarea-autosize';
import YesNoChoices from './YesNoChoices.jsx';

const QuestionForm = ({ onBlurAutoSave }) => {
    const { activeQuestion, watch, setValue, control, register } = useCustomFormProvider();
    const { dirtyFields, touchedFields } = useFormState({
        control
    });

    const type = watch(`questions.${activeQuestion}.type`);
    const hasChoices = ['MultipleChoiceQuestion', 'SingleChoiceQuestion'].includes(type);

    return (
        <main className='flex flex-col gap-1 flex-1 items-center justify-center '>
            <div className='bg-white/20 p-10 rounded-3xl shadow-md min-h-[200px] w-2/3 flex flex-col justify-center items-center gap-2'>
                <TextareaAutoSize
                    className='w-full text-xl outline-none resize-none rounded-md p-2 font-space-mono bg-transparent hover:bg-white/20 border border-transparent focus:border-gray-900 transition duration-500'
                    placeholder='your question here'
                    value={watch(`questions.${activeQuestion}.text`)}
                    {...register(`questions.${activeQuestion}.text`)}
                    onBlur={onBlurAutoSave}
                />
                <TextareaAutoSize
                    className='w-full text-lg outline-none resize-none rounded-md p-2 font-space-mono bg-transparent hover:bg-white/20 border border-transparent focus:border-gray-900 transition duration-500'
                    placeholder='description (optional)'
                    value={watch(`questions.${activeQuestion}.description`)}
                    {...register(`questions.${activeQuestion}.description`)}
                    onBlur={onBlurAutoSave}
                />

                {dirtyFields?.questions?.[activeQuestion]?.text && <p>Text field is dirty.</p>}
                {dirtyFields?.questions?.[activeQuestion]?.description && <p>Description field is dirty.</p>}

                {type === 'TextQuestion' && (
                    <div className='mt-2 p-2 pb-0 text-md w-full text-gray-900 border-b border-gray-900 font-space-mono'>your answer goes here</div>
                )}
                {hasChoices && <QuestionChoices />}
                {/* {mensaje abajo es temporaria hasta que el aviso funcione} */}
                {/* {hasChoices && <p>hey! this type of question needs at least two options</p>} */}

                {type === 'YesNoQuestion' && <YesNoChoices />}
            </div>
        </main>
    );
};

export default QuestionForm;
