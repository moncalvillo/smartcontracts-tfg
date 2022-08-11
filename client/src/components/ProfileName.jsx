import { useUser } from "../hooks/useUser";

const ProfileName = () => {

    const { user } = useUser();

    return (
        <div className="profile-name">
            <h2>{user.username}</h2>
            Full name: <h3> {user.firstName} {user.lastName}</h3>
            Email: <h3> {user.email}</h3>
            Role: <h3> {user.roleType}</h3>
        </div>
    );
}

export default ProfileName;