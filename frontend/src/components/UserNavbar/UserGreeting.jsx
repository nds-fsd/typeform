import { useUserProvider } from '../../context/UserContext';

const UserGreeting = () => {
    const { userName } = useUserProvider();

    return (
        <p className='lg:text-black text-transparent' >Hi, {userName}!</p>
    )
};

export default UserGreeting;
