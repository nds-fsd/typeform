import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import styles from './FormForm.module.css';
import { useFormProvider } from '../../context/FormContext';

const questionTypes = [
    { value: 'TextQuestion', label: 'Text' },
    { value: 'MultipleChoiceQuestion', label: 'Multiple Choice' },
    { value: 'SingleChoiceQuestion', label: 'Single Choice' },
    { value: 'YesNoQuestion', label: 'Yes/No' }
];

const QuestionForm = ({ onSubmit }) => {
    const {
        selectedQuestion,
        setValue,
        questionsFields,
        register,
        watch,
        control,
        handleSubmit
    } = useFormProvider();

    const questionId = selectedQuestion?._id;
    const questionIndex = questionsFields.findIndex(q => q._id === questionId);

    useEffect(() => {
        if (selectedQuestion) {
            setValue(`questions[${questionIndex}].type`, selectedQuestion.type);
            setValue(`questions[${questionIndex}].text`, selectedQuestion.text);
            setValue(`questions[${questionIndex}].description`, selectedQuestion.description || '');
            setValue(`questions[${questionIndex}].choices`, selectedQuestion.choices || []);
        }
    }, [selectedQuestion, questionIndex, setValue]);

    const { fields: choices, append, remove } = useFieldArray({
        control,
        name: `questions[${questionIndex}].choices`,
    });

    const type = watch(`questions[${questionIndex}].type`);

    useEffect(() => {
        if (type === 'YesNoQuestion' && choices.length !== 2) {
            remove(); // Remove all existing choices
            append({ label: 'Yes' });
            append({ label: 'No' });
        }
    }, [type, choices, append, remove]);

    if (!selectedQuestion) return <div>No question selected</div>;
    const handleSaveChoice = () => {
        console.log(choices, 'saved choices!!');
        console.log(watch(`questions[${questionIndex}].choices`));
        append({ label: '.' })
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onBlur={handleSubmit(onSubmit)}
                className={styles.form}
            >
                <div>
                    <select {...register(`questions[${questionIndex}].type`)}>
                        {questionTypes.map((questionType) => (
                            <option value={questionType.value} key={questionType.id}>
                                {questionType.label}
                            </option>
                        ))}
                    </select>
                    <input
                        id={styles.inputQuestionText}
                        type="text"
                        placeholder='Write your question here'
                        {...register(`questions[${questionIndex}].text`)}
                    />
                    <input
                        id={styles.inputQuestionDescription}
                        type="text"
                        placeholder='Optional description'
                        {...register(`questions[${questionIndex}].description`)}
                    />
                    {type !== 'TextQuestion' && (
                        <div>
                            {type === 'YesNoQuestion' ? (
                                <div>
                                    {choices.map((choice, choiceIndex) => (
                                        <div className={styles.questionChoice} key={choice.id}>
                                            <input
                                                id={`questions[${questionIndex}].choices[${choiceIndex}].label`}
                                                type="text"
                                                defaultValue={choice.label}
                                                readOnly
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    {choices.map((choice, choiceIndex) => (
                                        <div className={styles.questionChoice} key={choice.id}>
                                            <input
                                                id={styles.inputChoice}
                                                type="text"
                                                defaultValue={choice.label}
                                                {...register(`questions[${questionIndex}].choices[${choiceIndex}].label`)}
                                            />
                                            <button type="button" onClick={() => remove(choiceIndex)}>x</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => append({})}>Add Choice</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default QuestionForm;
