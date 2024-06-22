import { NavLink, useNavigate, useParams } from 'react-router-dom';
import styles from './QuestionCard.module.css';
import { useFormProvider } from '../../context/FormContext';
import { useEffect } from 'react';

const QuestionCard = (props) => {
    const { setSelectedQuestion, currentForm, remove, selectedQuestion } = useFormProvider();
    const navigate = useNavigate();
    const { question, index, onDragStart, onDragOver, onDrop, title } = props;
    console.log(currentForm, 'çurretn formmm vs', selectedQuestion)
    useEffect(() => {
        // Sincronize o valor do título com o question.text
        question.text = title;
    }, [title]);

    const handleSelectQuestion = () => {
        setSelectedQuestion(question);
        navigate(`/createform/${currentForm._id}/${question._id}`)
    };
    // console.log(selectedQuestion, 'selected question was just updated');

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