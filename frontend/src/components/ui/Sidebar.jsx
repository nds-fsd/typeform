import styles from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <ul>
                <li>numero question</li>
                <li>question type</li>
            </ul>
        </div>

    )
};

export default Sidebar;