import React, { useEffect, useRef, useContext } from 'react';
import styles from './FormForm.module.css';
import { useOutletContext, useParams } from 'react-router-dom';
import Footer from './Footer';
import QuestionChoices from './QuestionChoices';
import { api } from '../../utils/api';
import { FormContext, useFormProvider } from '../../context/FormContext';

const questionTypes = [
    { value: 'TextQuestion', label: 'Text' },
    { value: 'MultipleChoiceQuestion', label: 'Multiple Choice' },
    { value: 'SingleChoiceQuestion', label: 'Single Choice' },
    { value: 'YesNoQuestion', label: 'Yes/No' }
];

const QuestionForm = ({ fields, register, watch, control, handleSubmit, onSubmit }) => {
    const { selectedQuestion, currentForm, setValue } = useFormProvider();

    const index = selectedQuestion && fields.indexOf(selectedQuestion)
    const type = watch(`questions[${index}].type`);

    useEffect(() => {
        if (selectedQuestion) {
            setValue(`questions[${index}].type`, selectedQuestion.type);
            setValue(`questions[${index}].text`, selectedQuestion.text);
            setValue(`questions[${index}].description`, selectedQuestion.description || '');
            // Ensure we only set choices once to avoid duplicates
            if (selectedQuestion.choices) {
                setValue(`questions[${index}].choices`, selectedQuestion.choices);
            }
        }
    }, [selectedQuestion]);

    if (!selectedQuestion) return <div>no question selected</div>;

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onBlur={handleSubmit(onSubmit)}
                className={styles.form}
            >
                <div>
                    <select {...register(`questions[${index}].type`)}>
                        {questionTypes.map((questionType, index) => (
                            <option value={questionType.value} key={questionType.id}>
                                {questionType.label}
                            </option>
                        ))}
                    </select>
                    <input
                        id={styles.inputQuestionText}
                        type="text"
                        placeholder='write your question here'
                        {...register(`questions[${index}].text`)}
                    />
                    <p>{selectedQuestion.text}</p>
                    <h1>{selectedQuestion.type}</h1>
                    {/* <pre>{JSON.stringify(allForms, null, 2)}</pre> */}

                    <input
                        id={styles.inputQuestionDescription}
                        type="text"
                        placeholder='optional description'
                        {...register(`questions[${index}].description`)}
                    />
                    {type !== 'TextQuestion' && (
                        <QuestionChoices
                            register={register}
                            control={control}
                            index={index}
                            isYesNo={type === 'YesNoQuestion'}
                        />
                    )}

                </div>
            </form>
        </div>
    );
};

export default QuestionForm;