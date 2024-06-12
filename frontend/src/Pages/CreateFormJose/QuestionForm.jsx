import { useFieldArray } from "react-hook-form";
import styles from './QuestionForm.module.css';

const questionTypes = [{
    value: "TextQuestion",
    label: 'Text'
}, {
    value: "MultipleChoiceQuestion",
    label: 'Multiple Choice'
},
{
    value: "SingleChoiceQuestion",
    label: 'Single Choice'
},
{
    value: "YesNoQuestion",
    label: "Yes/No"
}];

const Choices = ({ register, control, index }) => {
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: `questions[${index}].choices`
    });

    return (
        <div>
            {fields.map((choice, choiceIndex) => (
                <div className={styles.questionChoice} key={choice.id} >
                    <label>Choice</label>
                    <input type="text" {...register(`questions[${index}].choices[${choiceIndex}].label`)} />
                    <button type="button" onClick={() => remove(choiceIndex)}>x</button>
                </div>
            ))
            }
            <button type="button" onClick={() => append({})}>Add Choice</button>
        </div >
    )
}

const QuestionForm = ({ register, index, watch, control }) => {
    const type = watch(`questions[${index}].type`);

    return (
        <div>
            <label>{index + 1}</label>
            <select {...register(`questions[${index}].type`, { value: "TextQuestion" })}>
                {questionTypes.map((questionType, index) => <option value={questionType.value} key={index}>{questionType.label}</option>)}
            </select>
            <label>Text</label>
            <input type="text" {...register(`questions[${index}].text`)} />
            <input type="text" {...register(`questions[${index}].description`)} />
            {type !== "TextQuestion" && (
                <Choices register={register} control={control} index={index} />
            )}
        </div>
    )
};

export default QuestionForm;