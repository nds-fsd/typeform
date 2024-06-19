import styles from './Login.module.css';
import LoginForm from './LoginForm';

const Login = () => {
    return (
        <div className={styles.mastercontainer}>
            <LoginForm />
        </div>
    );
};

export default Login;
