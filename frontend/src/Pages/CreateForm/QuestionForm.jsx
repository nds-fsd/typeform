import React, { useEffect, useRef, useContext } from 'react';
import styles from './FormForm.module.css';
import QuestionChoices from './QuestionChoices';
import { useFormProvider } from '../../context/FormContext';

const questionTypes = [
    { value: 'TextQuestion', label: 'Text' },
    { value: 'MultipleChoiceQuestion', label: 'Multiple Choice' },
    { value: 'SingleChoiceQuestion', label: 'Single Choice' },
    { value: 'YesNoQuestion', label: 'Yes/No' }
];

const QuestionForm = ({ onSubmit }) => {
    const {
        formQuestions,
        selectedQuestion,
        setValue,
        fields,
        register,
        watch,
        control,
        handleSubmit } = useFormProvider();

    const index = selectedQuestion && fields.indexOf(selectedQuestion)
    const type = watch(`questions[${index}].type`);
    console.log(watch(`questions[${index}].text`));
    console.log(formQuestions);

    useEffect(() => {
        if (selectedQuestion) {
            setValue(`questions[${index}].type`, selectedQuestion.type);
            setValue(`questions[${index}].text`, selectedQuestion.text);
            setValue(`questions[${index}].description`, selectedQuestion.description || '');
            setValue(`questions[${index}].choices`, selectedQuestion.choices);
        }
    }, [selectedQuestion]);

    if (!selectedQuestion) return <div>no question selected</div>;

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                // onBlur={handleSubmit(onSubmit)}
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
                    {/* <h1>{watch(`questions[${index}].text`)}</h1> */}
                    <input
                        id={styles.inputQuestionDescription}
                        type="text"
                        placeholder='optional description'
                        {...register(`questions[${index}].description`)}
                    />
                    {type !== 'TextQuestion' && (
                        <QuestionChoices
                            index={index}
                            isYesNo={type === 'YesNoQuestion'}
                            onSubmit={onSubmit}
                        />
                    )}

                </div>
            </form>
        </div>
    );
};

export default QuestionForm;

// import React, { useEffect, useRef, useContext } from 'react';
// import styles from './FormForm.module.css';
// import { useOutletContext, useParams } from 'react-router-dom';
// import Footer from './Footer';
// import QuestionChoices from './QuestionChoices';
// import { api } from '../../utils/api';
// import { FormContext, useFormProvider } from '../../context/FormContext';

// const questionTypes = [
//     { value: 'TextQuestion', label: 'Text' },
//     { value: 'MultipleChoiceQuestion', label: 'Multiple Choice' },
//     { value: 'SingleChoiceQuestion', label: 'Single Choice' },
//     { value: 'YesNoQuestion', label: 'Yes/No' }
// ];

// const QuestionForm = ({ }) => {
//     const {
//         onEditForm,
//         setOnEditForm,
//         allForms,
//         setAllForms,
//         data,
//         error,
//         isLoading,
//         isError
//     } = useFormProvider();

//     const { idQuestion } = useParams();
//     const { fields, register, watch, control, handleSubmit, onSubmit } = useOutletContext();
//     console.log(idQuestion)

//     //index of question: clean up unnecessary code and make calling the _id as
//     // direct as possible
//     //console.log('recebido:', fields, typeof fields)
//     const selectedQuestion = fields.find(question => question._id === idQuestion);
//     const index = fields.indexOf(selectedQuestion)
//     const type = watch(`questions[${index}].type`);

//     useEffect(() => {
//         console.log('selectedQuestion:', selectedQuestion);
//         console.log('index:', index);
//         // console.log('type:', type);
//         console.log(idQuestion);
//     }, [selectedQuestion, type, idQuestion]);

//     if (!selectedQuestion) return <div>Loading...</div>;

//     return (
//         <div>
//             <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 onBlur={handleSubmit(onSubmit)}
//                 className={styles.form}
//             >
//                 <div>
//                     <select {...register(`questions[${index}].type`)}>
//                         {questionTypes.map((questionType, index) => (
//                             <option value={questionType.value} key={questionType.id}>
//                                 {questionType.label}
//                             </option>
//                         ))}
//                     </select>
//                     <input
//                         id={styles.inputQuestionText}
//                         type="text"
//                         placeholder='write your question here'
//                         {...register(`questions[${index}].text`)}
//                     />
//                     <p>{selectedQuestion.text}</p>
//                     <h1>{onEditForm}</h1>
//                     <pre>{JSON.stringify(allForms, null, 2)}</pre>


//                     <input
//                         id={styles.inputQuestionDescription}
//                         type="text"
//                         placeholder='optional description'
//                         {...register(`questions[${index}].description`)}
//                     />
//                     {type !== 'TextQuestion' && (
//                         <QuestionChoices
//                             register={register}
//                             control={control}
//                             index={index}
//                             isYesNo={type === 'YesNoQuestion'}
//                         />
//                     )}

//                 </div>
//             </form>
//         </div>
//     );
// };

// export default QuestionForm;