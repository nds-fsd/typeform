import { useUserProvider } from '../../context/UserContext';

const UserGreeting = () => {
    const { userName } = useUserProvider();

    return (
        <p className='text-xl' >Hi, {userName}!</p>
    )
};

export default UserGreeting;
