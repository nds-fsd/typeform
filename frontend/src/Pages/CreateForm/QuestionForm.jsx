import { useFieldArray } from "react-hook-form";
import styles from './QuestionForm.module.css';
import QuestionChoices from "./QuestionChoices";

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

const QuestionForm = ({ register, index, watch, control }) => {
    const type = watch(`questions[${index}].type`);

    return (
        <div>
            <select {...register(`questions[${index}].type`)}>
                {questionTypes.map((questionType, index) => <option value={questionType.value} key={index}>{questionType.label}</option>)}
            </select>
            <input id={styles.inputQuestionText} type="text" {...register(`questions[${index}].text`)} />
            <input id={styles.inputQuestionDescription} type="text" {...register(`questions[${index}].description`)} />
            {type !== "TextQuestion" && (
                <>
                    <QuestionChoices
                        register={register}
                        control={control}
                        index={index}
                        questionType={type}
                    />
                </>
            )}
            {type === "YesNoQuestion" && (
                <>
                    <QuestionChoices
                        register={register}
                        control={control}
                        index={index}
                        questionType={type}
                        isYesNo={true}
                    />
                </>
            )}
        </div>
    )
};

export default QuestionForm;