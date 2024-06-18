import React, { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import styles from './QuestionChoices.module.css';

const QuestionChoices = ({ register, control, index, isYesNo }) => {
    // console.log('yesno?:', isYesNo)
    const { fields, append, remove } = useFieldArray({
        control,
        name: `questions[${index}].choices`,
    });

    return (
        <>
            {isYesNo &&
                <div>
                <div className={styles.questionChoice}>
                    <input
                        id={`questions[${index}].choices[0].label`}
                        type="text"
                        defaultValue="Yes"
                        readOnly
                    />
                </div>
                <div className={styles.questionChoice}>
                    <input
                        id={`questions[${index}].choices[1].label`}
                        type="text"
                        defaultValue="No"
                        readOnly
                    />
                </div>
            </div>
            }
            {!isYesNo && (<div>
            {fields.map((choice, choiceIndex) => (
                <div className={styles.questionChoice} key={choice.id}>
                    <input
                        id={styles.inputChoice}
                        type="text"
                        defaultValue={choice.label}
                        {...register(`questions[${index}].choices[${choiceIndex}].label`)}
                    />
                    {choice.label !== 'Yes' && choice.label !== 'No' && (
                        <button type="button" onClick={() => remove(choiceIndex)}>x</button>
                    )}
                </div>
            ))}
            <button type="button" onClick={() => append({ label: 'new choice' })}>Add Choice</button>
        </div>)}
            
            
        </>
    )
}

export default QuestionChoices;

// console.log('yesno?:', isYesNo)
// const { fields, append, remove } = useFieldArray({
//     control,
//     name: `questions[${index}].choices`,
// });

// return (
//     <>
//         {isYesNo &&
//             <QuestionChoicesYesNo register={register} control={control} index={index} />
//         }
        
//         <QuestionChoicesNormal register={register} control={control} index={index} fields={fields} />
//     </>
// )