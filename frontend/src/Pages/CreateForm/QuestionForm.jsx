import React, { useEffect, useRef } from 'react';
import styles from './FormForm.module.css';
import { useOutletContext, useParams } from 'react-router-dom';
import Footer from './Footer';
import QuestionChoices from './QuestionChoices';

const questionTypes = [
    { value: 'TextQuestion', label: 'Text' },
    { value: 'MultipleChoiceQuestion', label: 'Multiple Choice' },
    { value: 'SingleChoiceQuestion', label: 'Single Choice' },
    { value: 'YesNoQuestion', label: 'Yes/No' }
];

const QuestionForm = () => {
    const { idQuestion } = useParams();
    const { fields, register, watch, control, handleSubmit, onSubmit } = useOutletContext();

    //index of question: clean up unnecessary code and make calling the _id as
    // direct as possible
    //console.log('recebido:', fields, typeof fields)
    const selectedQuestion = fields.find(question => question._id === idQuestion);
    const index = fields.indexOf(selectedQuestion)

    useEffect(() => {
        console.log('selectedQuestion:', selectedQuestion);
        console.log('index:', index);
    }, [selectedQuestion, index]);

    const type = watch(`questions[${index}].type`);

    useEffect(() => {
        console.log('selectedQuestion:', selectedQuestion);
        console.log('index:', index);
        console.log('type:', type);
    }, [selectedQuestion, index, type]);

    if (!selectedQuestion) return <div>Loading...</div>;

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onBlur={handleSubmit(onSubmit)}
                className={styles.form}
            >
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
        </div>
    );
};

export default QuestionForm;