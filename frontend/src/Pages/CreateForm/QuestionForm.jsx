import React from 'react';
import styles from './QuestionForm.module.css';
import QuestionChoices from './QuestionChoices';
import { useParams } from 'react-router-dom';

const questionTypes = [
    { value: 'TextQuestion', label: 'Text' },
    { value: 'MultipleChoiceQuestion', label: 'Multiple Choice' },
    { value: 'SingleChoiceQuestion', label: 'Single Choice' },
    { value: 'YesNoQuestion', label: 'Yes/No' }
];

const QuestionForm = ({ register, index, watch, control, onSubmit }) => {
    const type = watch(`questions[${index}].type`);
    const { idQuestion } = useParams();
    console.log('id recebido da question em formmmmm', idQuestion)

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevenir o comportamento padrão do formulário se necessário
        onSubmit(); // Chamar a função onSubmit passada como prop
    };

    return (
        <form onSubmit={handleFormSubmit} className={styles.form}>
            <div>
                <select {...register(`questions[${index}].type`)}>
                    {questionTypes.map((questionType, idx) => (
                        <option value={questionType.value} key={idx}>
                            {questionType.label}
                        </option>
                    ))}
                </select>
                <input
                    id={styles.inputQuestionText}
                    type="text"
                    {...register(`questions[${index}].text`)}
                />
                <input
                    id={styles.inputQuestionDescription}
                    type="text"
                    {...register(`questions[${index}].description`)}
                />
                {type !== 'TextQuestion' && (
                    <QuestionChoices
                        register={register}
                        control={control}
                        index={index}
                        questionType={type}
                    />
                )}
                {type === 'YesNoQuestion' && (
                    <QuestionChoices
                        register={register}
                        control={control}
                        index={index}
                        questionType={type}
                        isYesNo={true}
                    />
                )}
            </div>
        </form>
    );
};

export default QuestionForm;
