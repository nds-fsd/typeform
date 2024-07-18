import QuestionChoices from './QuestionChoices.jsx';
import { useCustomFormProvider } from '../../context/FormContext.jsx';
import TextareaAutoSize from 'react-textarea-autosize';
import YesNoChoices from './YesNoChoices.jsx';

const QuestionForm = ({ autoSave }) => {
    const { activeQuestion, watch, setValue, control, register } = useCustomFormProvider();

    const type = watch(`questions.${activeQuestion}.type`);
    const hasChoices = ['MultipleChoiceQuestion', 'SingleChoiceQuestion'].includes(type);

    return (
        <main className=' m-auto w-2/5 rounded-3xl shadow-md bg-white/50 p-10 max-h-[600px] gap-1 justify-center align-center flex flex-col w-full'>
            <TextareaAutoSize
                className='w-full max-h-40 text-xl outline-none resize-none rounded-md p-2 bg-transparent hover:bg-white/50 border border-transparent focus:border-gray-900 transition duration-500 overflow-auto'
                placeholder='your question here'
                value={watch(`questions.${activeQuestion}.text`)}
                {...register(`questions.${activeQuestion}.text`)}
            />
            <TextareaAutoSize
                className='w-full max-h-40 text-lg outline-none resize-none rounded-md p-2 bg-transparent hover:bg-white/50 border border-transparent focus:border-gray-900 transition duration-500'
                placeholder='description (optional)'
                value={watch(`questions.${activeQuestion}.description`)}
                {...register(`questions.${activeQuestion}.description`)}
                onBlur={autoSave}
            />
            {type === 'TextQuestion' && (
                <div className='mt-2 p-2 pb-0 text-md w-full text-gray-900 border-b border-gray-900'>answer goes here</div>
            )}
            {hasChoices && <QuestionChoices autoSave={autoSave} />}
            {type === 'YesNoQuestion' && <YesNoChoices />}
        </main>
    );
};

export default QuestionForm;
