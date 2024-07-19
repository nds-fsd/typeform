import { useUserProvider } from '../../context/UserContext';

const UserGreeting = () => {
    const { userName } = useUserProvider();

    return (
        <p className='text-xl md:text-xl lg:text-black text-transparent' >Hi, {userName}!</p>
    )
};

export default UserGreeting;
