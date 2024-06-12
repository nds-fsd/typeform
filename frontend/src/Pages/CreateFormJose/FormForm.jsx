import { useFieldArray } from "react-hook-form";
import styles from './CreateForm.module.css';
import QuestionForm from "./QuestionForm";
import { Link } from 'react-router-dom';
// import Sidebar from "../../components/ui/Sidebar";
import Footer from "./Footer";
// const fieldsMap = () => {fields.map((question, index) => (
//     <div className={styles.question} key={index}>
//         <QuestionForm
//             key={question.id}
//             register={register}
//             index={index}
//             watch={watch}
//             control={control}
//         />
//         <button type="button" onClick={() => remove(index)}>x</button>
//     </div>
// ))};
const FormForm = ({ register, handleSubmit, onSubmit, watch, control }) => {
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "questions"
    });

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Link reloadDocument={false} className={styles.workspaceLink} to={'/workspace'}>my workspace</Link>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.headerForm}>
                    <input id={styles.inputFormTitle} type="text" {...register('title')} />
                    <br />
                </form>
            </header>
            <aside className={styles.sidebar}>
                <ul>
                    <li>numero question</li>
                    <li>question type</li>
                    <li>numero question</li>
                    <li>question type</li>
                </ul>
            </aside>
            <main className={styles.content}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    {fields.map((question, index) => (
                        <div className={styles.question} key={index}>
                            <QuestionForm
                                key={question.id}
                                register={register}
                                index={index}
                                watch={watch}
                                control={control}
                            />
                            <button type="button" onClick={() => remove(index)}>x</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => append({})}>+ add question</button>
                    <button type="submit">Submit</button>
                </form>
                <Footer />
            </main>
        </div >
    )
};

export default FormForm;