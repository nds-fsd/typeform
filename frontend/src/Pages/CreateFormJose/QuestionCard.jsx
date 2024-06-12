import styles from './QuestionCard.module.css';

const QuestionCard = (props) => {
    const { register, index, watch, control, swap, questionText, remove, onDragStart, onDragOver, onDrop } = props;
    // const indexNumber = watch(`questions[${index + 1}]`);

    return (
        <li
            className={styles.questionCard}
            draggable
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            <p>{index + 1}</p>
            <p>{questionText}</p>
            <button type="button" onClick={remove}>x</button>
        </li >
    )
}
export default QuestionCard;