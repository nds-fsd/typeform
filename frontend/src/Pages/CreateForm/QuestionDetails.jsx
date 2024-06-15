import React, { useRef } from 'react';
import styles from './FormForm.module.css';
import QuestionForm from './QuestionForm';
import { useOutletContext, useParams } from 'react-router-dom';
import Footer from './Footer';

const QuestionDetails = () => {
    const { idQuestion } = useParams();
    console.log('id recebido da question é ', idQuestion)
    const formRef = useRef();

    const { fields, register, watch, control, handleSubmit, onSubmit } = useOutletContext();
    console.log('recebido:', fields, typeof fields)
    const selectedQuestion = fields.find(question => question._id === idQuestion);

    const handleFormSubmit = () => {
        const submitEvent = new SubmitEvent('submit', { bubbles: true });
        formRef.current.dispatchEvent(submitEvent)
    };

    return (
        <div>
            {selectedQuestion ? (
                <form ref={formRef} onBlur={handleSubmit(onSubmit)} className={styles.form}>

                    <div className={styles.question}>
                        <QuestionForm
                            key={selectedQuestion.id}
                            register={register}
                            index={fields.indexOf(selectedQuestion)}
                            watch={watch}
                            control={control}
                        />
                    </div>
                </form>
            ) : (
                <p>Select a question to see its details.</p>
            )

            }
            <Footer onSubmit={handleFormSubmit} />



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
