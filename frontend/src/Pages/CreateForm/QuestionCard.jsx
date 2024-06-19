import { NavLink, useNavigate, useParams } from 'react-router-dom';
import styles from './QuestionCard.module.css';
import { useFormProvider } from '../../context/FormContext';

const QuestionCard = (props) => {
    const {
        formQuestions,
        setSelectedQuestion,
        selectedQuestion,
        onEditForm,
        setOnEditForm,
        register,
        control,
        handleSubmit,
        watch,
        remove,
        setValue
    } = useFormProvider();
    const navigate = useNavigate();
    const { question, index, onDragStart, onDragOver, onDrop } = props;

    // console.log('trying id form by context: ', onEditForm._id);
    // console.log('trying id form Q by context: ', question.text);
    // console.log('trying id form Q by context: ', formQuestions.length);

    // const indexNumber = watch(`questions[${index + 1}]`);

    const handleClick = () => {
        setSelectedQuestion(question);
        // navigate(`/createform/${onEditForm._id}/${question._id}`)
    };
    // console.log(selectedQuestion, 'atualizada');

    return (
        <>
            <li
                className={styles.questionCard}
                draggable
                onDragStart={onDragStart}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onClick={handleClick}
            >
                <p id={styles.indexNumber}>{index + 1}</p>
                <p>{question.text}</p>
                <button type="button" onClick={() => remove(index)}>x</button>
            </li>

        </>
    )
}

export default QuestionCard;