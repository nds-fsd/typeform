import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import styles from './QuestionChoices.module.css';
import { useFormProvider } from '../../context/FormContext';

const QuestionChoices = ({ index, isYesNo, onSubmit }) => {
    const {
        selectedQuestion,
        setValue,
        register,
        watch,
        control,
        handleSubmit } = useFormProvider();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `questions[${index}].choices`,
    });
    console.log('choices now:', watch(`questions[${index}].choices`));
    console.log(fields, 'fields en choices');

    useEffect(() => {
        handleSubmit(onSubmit)
    }, [fields]);
    useEffect(() => {
        // Reset choices if question type is YesNoQuestion
        if (isYesNo) {
            if (fields.length !== 2 || fields[0]?.label !== 'Yes' || fields[1]?.label !== 'No') {
                // remove(); // Remove all existing choices
                append({ label: 'Yes' });
                append({ label: 'No' });
            }
        }
    }, [isYesNo]);

    return (
        <>
            {isYesNo ? (
                <div>
                    {fields.map((choice, choiceIndex) => (
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
                    {fields.map((choice, choiceIndex) => (
                        <div className={styles.questionChoice} key={choice.id}>
                            <input
                                id={styles.inputChoice}
                                type="text"
                                defaultValue={choice.label}
                                {...register(`questions[${index}].choices[${choiceIndex}].label`)}
                            // onBlur={
                            //     () => setValue(
                            //         `questions[${index}].choices[${choiceIndex}].label`,
                            //         watch(`questions[${index}].choices[${choiceIndex}].label`)
                            //     )}

                            />
                            <button type="button" onClick={() => remove(choiceIndex)}>x</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => append({ label: 'new choice' })}>Add Choice</button>
                </div>
            )}
        </>
    );
};

export default QuestionChoices;
