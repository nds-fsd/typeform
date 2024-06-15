import { useFieldArray } from "react-hook-form";
import styles from './FormForm.module.css';
import QuestionForm from "./QuestionForm";
import { Link, Outlet } from 'react-router-dom';
// import Sidebar from "../../components/ui/Sidebar";
import Footer from "./Footer";
import QuestionCard from "./QuestionCard";
import { useState, useRef } from "react";

const FormForm = ({ register, handleSubmit, onSubmit, watch, control, idForm }) => {
    const { fields, append, remove, swap, move, insert } = useFieldArray({
        control,
        name: "questions"
    });
    const something = () => console.log('abc');

    const formRef = useRef();

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
    };

    const handleAddQuestion = () => {
        // Adiciona uma nova pergunta
        append({ text: '', description: '', type: 'TextQuestion' });

        // Captura os dados do formulário para submissão
        const formData = watch();
        handleSubmit(onSubmit)(formData);
    };

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
                <button type="button" onClick={handleAddQuestion}>+ add question</button>
                <ul>{fields.map((question, index) => (
                    <div className={styles.question} key={index}>
                        <QuestionCard
                            key={question.id}
                            idQuestion={question._id}
                            idForm={idForm}
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
                <Outlet context={{ fields, register, watch, control, handleSubmit, onSubmit }} />
            </main>
            <Footer onSubmit={handleSubmit(onSubmit)} />
        </div >
    )
};

export default FormForm;