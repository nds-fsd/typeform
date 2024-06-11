import styles from './Sidebar.module.css';

const Sidebar = ({ questions }) => {
    return (
        <div className={styles.sidebar}>
            <ul>
                <p>a</p>
                <li>numero question</li>
                <li>question type</li>
            </ul>
        </div>

    )
};

export default Sidebar;