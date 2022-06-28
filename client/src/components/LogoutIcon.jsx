import {BiLogOutCircle} from 'react-icons/bi';
const LogoutIcon = () => {

    const logout = () => {
        localStorage.removeItem("access_token");
        window.location.reload();
    };

    return (
        <div className="logoutDiv">
            <BiLogOutCircle className="logoutIcon" size="50px" onClick={logout}/>
        </div>
    );


}
export default LogoutIcon;