import React from 'react';
import styles from './FormForm.module.css';
import QuestionForm from './QuestionForm';
import { useOutletContext } from 'react-router-dom';

const QuestionDetails = () => {
    const [fields, something] = useOutletContext();
    console.log('recebido:', fields, typeof fields)
    console.log('tentando entrar no objeto:', fields[0].text, typeof fields)

    return (
        <>
            <p>{fields[0].text}</p>
            <p>{something}</p>
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
