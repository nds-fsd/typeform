import React, { useRef } from 'react';
import styles from './FormForm.module.css';
import QuestionForm from './QuestionForm';
import { useOutletContext, useParams } from 'react-router-dom';
import Footer from './Footer';
import QuestionChoices from './QuestionChoices';

const questionTypes = [
    { value: 'TextQuestion', label: 'Text' },
    { value: 'MultipleChoiceQuestion', label: 'Multiple Choice' },
    { value: 'SingleChoiceQuestion', label: 'Single Choice' },
    { value: 'YesNoQuestion', label: 'Yes/No' }
];

const QuestionDetails = () => {

    const { idQuestion } = useParams();
    const formRef = useRef();

    const { fields, register, watch, control, handleSubmit, onSubmit } = useOutletContext();

    //index da question

    console.log('recebido:', fields, typeof fields)
    const selectedQuestion = fields.find(question => question._id === idQuestion);
    const index = fields.indexOf(selectedQuestion)

    const type = watch(`questions[${index}].type`);

    return (
        <div>

            <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onSubmit)} className={styles.form}>
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

export default QuestionDetails;

// import React from 'react';
// import styles from './FormForm.module.css';
// import QuestionForm from './QuestionForm';

// const QuestionDetails = ({ formRef, onSubmit, fields, register, watch, control }) => {
//     return (
//         <form ref={formRef} onSubmit={onSubmit} className={styles.form}>
//             {fields.map((question, index) => (
//                 <div className={styles.question} key={index}>
//                     <QuestionForm
//                         key={question.id}
//                         register={register}
//                         index={index}
//                         watch={watch}
//                         control={control}
//                     />
//                 </div>
//             ))}
//         </form>
//     );
// };

// export default QuestionDetails;
