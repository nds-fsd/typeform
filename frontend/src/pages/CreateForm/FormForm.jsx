import { useFieldArray, useForm } from "react-hook-form";
import styles from './FormForm.module.css';
import QuestionForm from "./QuestionForm";
import { Link, Outlet } from 'react-router-dom';
// import Sidebar from "../../components/ui/Sidebar";
import Footer from "./Footer";
import QuestionCard from "./QuestionCard";
import { useState, useRef, useEffect } from "react";
import { useFormProvider } from "../../context/FormContext";

const FormForm = ({ onSubmit }) => {
    const {
        currentForm,
        selectedQuestion,
        register,
        control,
        handleSubmit,
        watch,
        questionsFields,
        setValue,
        append,
        swap
    } = useFormProvider();

    // console.log('on edit dentro de FormForm:: ', currentForm);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const { formQuestions, setFormQuestions } = useFormProvider();
    console.log(currentForm, 'is the currentForm')

    useEffect(() => {
        // console.log('questionsFields updated:', questionsFields);
        // console.log(selectedQuestion, 'triggered useEffect')
        // console.log('watch:', watch());
        setFormQuestions(questionsFields);
    }, [questionsFields, onSubmit, register, formQuestions]);
    // console.log(formQuestions, register)

    const handleDragStart = (e, index) => {
        setDraggedIndex(index)
    };

    const handleOnDrop = (e, dropIndex) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== dropIndex) {
            swap(draggedIndex, dropIndex);
        }
        setDraggedIndex(null)
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleAddQuestion = () => {
        append({ text: '...', type: 'TextQuestion' });
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
                <ul>{questionsFields.map((question, index) => (
                    <QuestionCard
                        question={question}
                        key={question.id}
                        index={index}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDrop={(e) => handleOnDrop(e, index)}
                        onDragOver={(e) => handleDragOver(e)}
                        title={watch(`questions[${index}].text`)}
                    />
                ))}</ul>

            </aside>
            <main className={styles.content}>
                <QuestionForm
                    onSubmit={onSubmit}
                />
            </main>
            <Footer onSubmit={handleSubmit(onSubmit)} />
        </div >
    )
};

export default FormForm;