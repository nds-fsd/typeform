import { Link } from 'react-router-dom'

function TitleLink({ children, text, to, ...rest }) {
    return (
        <Link className='btn btn-ghost text-4xl cursor-pointer font-abril-fatface' to={to ? to : '/workspace'}>
            {text ? text : 'my workspace'}
        </Link>
    )
}

export default TitleLink