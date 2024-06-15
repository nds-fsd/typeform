import React from 'react';
import styles from './FormForm.module.css';
import QuestionForm from './QuestionForm';
import { useOutletContext, useParams } from 'react-router-dom';

const QuestionDetails = () => {
    const { idQuestion } = useParams();
    console.log('id recebido da question é ', idQuestion)

    const { fields, register, watch, control } = useOutletContext();
    console.log('recebido:', fields, typeof fields)
    const selectedQuestion = fields.find(question => question._id === idQuestion);

    // console.log('tentando entrar no objeto:', fields[0].text, typeof fields)
    return (
        <>
            {fields.map((info, index) => (
                <div key={index}>
                    <p>ID: {info._id}</p>
                    <p>Text: {info.text}</p>
                    <p>Description: {info.description}</p>
                    {/* Renderizar outras propriedades conforme necessário */}
                </div>
            ))}
            selectedQuestion ? (
            <div className={styles.question}>
                <QuestionForm
                    key={selectedQuestion.id}
                    register={register}
                    index={fields.indexOf(selectedQuestion)}
                    watch={watch}
                    control={control}
                />
            </div>
            ) : (
            <p>Select a question to see its details.</p>
            )
            );
        </>
    )
}
// find out how to pass onSubmit and other through OutletContext
// return (
//     <form onSubmit={onSubmit} className={styles.form}>

//         <p>{ }</p>
//         <input type='submit'></input>

//     </form >
// )
{/* <QuestionForm
key={question._id}
register={register}
watch={watch}
control={control}
/> */}
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
