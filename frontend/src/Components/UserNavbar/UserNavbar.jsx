import UserGreeting from './UserGreeting'
import TitleLink from './TitleLink'

const UserNavbar = () => {
    return (
        <div className="flex items-baseline">
            <TitleLink />
            <UserGreeting />
        </div>
    )
}

export default UserNavbar