import { useUserProvider } from '../../context/UserContext';

const UserGreeting = () => {
    const { userName } = useUserProvider();

    return (
        <p className='text-2xl' >Hi, {userName}!</p>
    )
};

export default UserGreeting;
