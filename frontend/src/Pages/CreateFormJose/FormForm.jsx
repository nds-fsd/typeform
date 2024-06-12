import { useFieldArray } from "react-hook-form";
import styles from './FormForm.module.css';
import QuestionForm from "./QuestionForm";
import { Link } from 'react-router-dom';
// import Sidebar from "../../components/ui/Sidebar";
import Footer from "./Footer";
import QuestionCard from "./QuestionCard";
import { useState, useEffect } from "react";
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
    const { fields, append, remove, swap, move, insert } = useFieldArray({
        control,
        name: "questions"
    });

    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (e, index) => {
        setDraggedIndex(index)
        console.log('draggedIndex vai ser: ', index);
    };

    const handleOnDrop = (e, dropIndex) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== dropIndex) {
            swap(draggedIndex, dropIndex);
            console.log('draggedIndex went from: ', draggedIndex, 'to', dropIndex);
        }
        setDraggedIndex(null)
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        console.log('draggedIndex while dragging over is: ', draggedIndex);
    }

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Link className={styles.workspaceLink} to={'/workspace'}>my workspace</Link>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.headerForm}>
                    <input id={styles.inputFormTitle} type="text" {...register('title')} />
                    <br />
                </form>
            </header>
            <aside className={styles.sidebar}>
                <ul>{fields.map((question, index) => (
                    <div className={styles.question} key={index}>
                        <QuestionCard
                            key={question.id}
                            register={register}
                            index={index}
                            watch={watch}
                            control={control}
                            questionText={question.text}
                            remove={() => remove(index)}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDrop={(e) => handleOnDrop(e, index)}
                            onDragOver={(e) => handleDragOver(e)}
                        />
                    </div>
                ))}</ul>

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