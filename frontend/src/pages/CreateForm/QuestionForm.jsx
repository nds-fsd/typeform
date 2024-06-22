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

const QuestionForm = ({ question, index, onSubmit }) => {
    const {
        selectedQuestion,
        setValue,
        questionsFields,
        register,
        watch,
        control,
        handleSubmit,
        currentForm
    } = useFormProvider();

    // const questionId = selectedQuestion?._id;
    console.log(index, 'current index')
    console.log(question.id, 'current quest')
    useEffect(() => {
        if (selectedQuestion) {
            setValue(`questions[${index}].type`, selectedQuestion1.type);
            setValue(`questions[${index}].text`, selectedQuestion.text);
            setValue(`questions[${index}].description`, selectedQuestion.description || '');
            setValue(`questions[${index}].choices`, selectedQuestion.choices || []);
        }
    }, [selectedQuestion, index, setValue]);

    const { fields: choices, append, remove } = useFieldArray({
        control,
        name: `questions[${index}].choices`,
    });

    const type = watch(`questions[${index}].type`);

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
        console.log(watch(`questions[${index}].choices`));
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
                    <select {...register(`questions[${index}].type`)}>
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
                        {...register(`questions[${index}].text`)}
                    />
                    <input
                        id={styles.inputQuestionDescription}
                        type="text"
                        placeholder='Optional description'
                        {...register(`questions[${index}].description`)}
                    />
                    {type !== 'TextQuestion' && (
                        <div>
                            {type === 'YesNoQuestion' ? (
                                <div>
                                    {choices.map((choice, choiceIndex) => (
                                        <div className={styles.questionChoice} key={choice.id}>
                                            <input
                                                id={`questions[${index}].choices[${choiceIndex}].label`}
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
                                                {...register(`questions[${index}].choices[${choiceIndex}].label`)}
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
// // de TYP-30
// import styles from './FormForm.module.css';

// const QuestionForm = ({ register, index, watch, control }) => {
//     const type = watch(`questions[${index}].type`);

//     return (
//         <div>
//             <select {...register(`questions[${index}].type`)}>
//                 {questionTypes.map((questionType, index) => <option value={questionType.value} key={index}>{questionType.label}</option>)}
//             </select>
//             <input id={styles.inputQuestionText} type="text" {...register(`questions[${index}].text`)} />
//             <input id={styles.inputQuestionDescription} type="text" {...register(`questions[${index}].description`)} />
//             {type !== "TextQuestion" && (
//                 <QuestionChoices register={register} control={control} index={index} />
//             )}
//         </div>
//     )
// };

// export default QuestionForm;