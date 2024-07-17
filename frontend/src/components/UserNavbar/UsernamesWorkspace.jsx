import { Link } from 'react-router-dom'
import { useUserProvider } from '../../context/UserContext';

function UsernamesWorkspace({ children, text, to, ...rest }) {
    const { userName } = useUserProvider();

    return (
        <Link className='text-4xl cursor-pointer' to={to ? to : '/workspace'}>
            {text ? text : `${userName}\'s workspace`}
        </Link>
    )
}

export default UsernamesWorkspace