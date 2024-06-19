import { NavLink, useNavigate, useParams } from 'react-router-dom';
import styles from './QuestionCard.module.css';
import { useFormProvider } from '../../context/FormContext';

const QuestionCard = (props) => {
    const {
        formQuestions,
        setSelectedQuestion,
        selectedQuestion,
        currentForm,
        setCurrentForm,
        register,
        control,
        handleSubmit,
        watch,
        remove,
        setValue
    } = useFormProvider();
    const navigate = useNavigate();
    const { question, index, onDragStart, onDragOver, onDrop } = props;

    // console.log('trying id form by context: ', currentForm._id);
    // console.log('trying id form Q text by context: ', question.text);
    // const indexNumber = watch(`questions[${index + 1}]`);

    const handleSelectQuestion = () => {
        setSelectedQuestion(question);
        navigate(`/createform/${currentForm._id}/${question._id}`)
    };
    // console.log(selectedQuestion, 'atualizada');

    const handleDeleteQuestion = () => {
        setSelectedQuestion(undefined);
        remove(index)
    }

    return (
        <>
            <li
                className={styles.questionCard}
                draggable
                onDragStart={onDragStart}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onClick={handleSelectQuestion}
            >
                <p id={styles.indexNumber}>{index + 1}</p>
                <p>{question.text}</p>
                <button type="button" onClick={handleDeleteQuestion}>x</button>
            </li>

        </>
    )
}

export default QuestionCard;