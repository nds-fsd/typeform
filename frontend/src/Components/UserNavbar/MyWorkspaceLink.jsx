import { Link } from 'react-router-dom'
import { useUserProvider } from '../../context/UserContext';

const MyWorkspaceLink = ({ children, text, to, ...rest }) => {
    const { userName } = useUserProvider();

    return (
        <Link className='text-4xl cursor-pointer' to={to ? to : '/workspace'}>
            {text ? text : 'my workspace'}
        </Link>
    )
}

export default MyWorkspaceLink