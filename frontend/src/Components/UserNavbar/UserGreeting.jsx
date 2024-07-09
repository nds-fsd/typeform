import { useUserProvider } from '../../context/UserContext';

const UserGreeting = () => {
    const { userName } = useUserProvider();

    return (
        <h1>Hi, {userName}!</h1>
    )
};

export default UserGreeting;
