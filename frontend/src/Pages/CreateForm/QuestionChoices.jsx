import React from 'react'
import { useFieldArray } from 'react-hook-form';

const QuestionChoices = ({ register, control, index }) => {
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: `questions[${index}].choices`
    });

    return (
        <div>
            {fields.map((choice, choiceIndex) => (
                <div className={styles.questionChoice} key={choice.id} >
                    <input id={styles.inputChoice} type="text" {...register(`questions[${index}].choices[${choiceIndex}].label`)} />
                    <button type="button" onClick={() => remove(choiceIndex)}>x</button>
                </div>
            ))
            }
            <button type="button" onClick={() => append({})}>Add Choice</button>
        </div >
    )
}

export default QuestionChoices;