import { NavLink, useParams } from 'react-router-dom';
import styles from './QuestionCard.module.css';

const QuestionCard = (props) => {
    const { register, index, watch, control, swap, questionText, remove, onDragStart, onDragOver, onDrop, idForm, idQuestion } = props;
    const { id } = useParams(); // Obtém o idForm da URL

    // const indexNumber = watch(`questions[${index + 1}]`);

    return (
        <>
            <NavLink to={`/createform/${idForm}/${idQuestion}`}>
                <li
                    className={styles.questionCard}
                    draggable
                    onDragStart={onDragStart}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    <p id={styles.indexNumber}>{index + 1}</p>
                    <p>{questionText}</p>
                    <button type="button" onClick={remove}>x</button>
                </li>
            </NavLink>

        </>
    )
}
export default QuestionCard;