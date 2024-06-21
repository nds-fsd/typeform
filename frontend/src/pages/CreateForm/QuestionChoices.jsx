import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import styles from './QuestionChoices.module.css';
import { useFormProvider } from '../../context/FormContext';

const QuestionChoices = ({ index, isYesNo, onSubmit }) => {
    const {
        register,
        watch,
        control,
        handleSubmit } = useFormProvider();
    const { fields: choicesFields, append, remove } = useFieldArray({
        control,
        name: `questions[${index}].choices`,
    });
    // console.log('choices now:', watch(`questions[${index}].choices`));
    // console.log(choices, 'fields en choices');

    useEffect(() => {
        // Reset choices if question type is YesNoQuestion
        if (isYesNo) {
            if (choicesFields.length !== 2 || choicesFields[0]?.label !== 'Yes' || choicesFields[1]?.label !== 'No') {
                // remove(); // Remove all existing choices
                append({ label: 'Yes' });
                append({ label: 'No' });
            }
        }
    }, [isYesNo]);

    useEffect(() => {
        console.log('Choices for question index', index, ':', choicesFields);
    }, [choicesFields, index]);

    return (
        <>
            {isYesNo ? (
                <div>
                    {choicesFields.map((choice, choiceIndex) => (
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
                    {choicesFields.map((choice, choiceIndex) => (
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
                    <button type="button" onClick={() => append({})}>Add Choice</button>
                </div>
            )}
        </>
    );
};

export default QuestionChoices;

// // functional version (from TYP-30):
// const QuestionChoices = ({ register, control, index }) => {
//     const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
//         control,
//         name: `questions[${index}].choices`
//     });

//     return (
//         <div>
//             {fields.map((choice, choiceIndex) => (
//                 <div className={styles.questionChoice} key={choice.id} >
//                     <input id={styles.inputChoice} type="text" {...register(`questions[${index}].choices[${choiceIndex}].label`)} />
//                     <button type="button" onClick={() => remove(choiceIndex)}>x</button>
//                 </div>
//             ))
//             }
//             <button type="button" onClick={() => append({})}>Add Choice</button>
//         </div >
//     )
// }

