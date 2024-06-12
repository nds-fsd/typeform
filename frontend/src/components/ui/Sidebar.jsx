import styles from './Sidebar.module.css';

const Sidebar = ({ questions }) => {
    return (
        <aside className={styles.sidebar}>
            <ul>
                <li>numero question</li>
                <li>question type</li>
                <li>numero question</li>
                <li>question type</li>

            </ul>
        </aside>
    )
};

export default Sidebar;