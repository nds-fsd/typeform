import { useUserProvider } from '../../context/UserContext';

const UserGreeting = () => {
    const { userName } = useUserProvider();

    return (
        <h1 className='text-4xl ' >Hi, {userName}!</h1>
    )
};

export default UserGreeting;
