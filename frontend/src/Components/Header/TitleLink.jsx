import { Link } from 'react-router-dom'

function TitleLink({ children, text, to, ...rest }) {
    return (
        <Link className='btn btn-ghost text-3xl cursor-pointer ' to={to ? to : '/workspace'}>
            {text ? text : 'my workspace'}
        </Link>
    )
}

export default TitleLink