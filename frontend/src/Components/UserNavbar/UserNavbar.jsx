import UserGreeting from './UserGreeting'
import UsernamesWorkspace from './UsernamesWorkspace'
import MyWorkspaceLink from './MyWorkspaceLink'
import ProfileIcon from '../Profile/Profile'

const UserNavbar = () => {
    return (
        <div className="flex items-baseline min-w-screen p-8 pb-0 gap-8 border-gray-800">
            <UsernamesWorkspace />
            {/* <MyWorkspaceLink /> */}
            {/* <UserGreeting /> */}
            <ProfileIcon accountSettingsId='accountSettings' profileIconId='profileIcon' />
        </div>
    )
}

export default UserNavbar

//         <div className="flex items-baseline min-w-screen p-8 pb-4 gap-8 border-b-2 border-gray-800">
