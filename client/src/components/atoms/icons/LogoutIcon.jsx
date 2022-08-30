import {BiLogOutCircle} from 'react-icons/bi';
import { useUser } from '../../hooks/useUser';

const LogoutIcon = () => {

    const { setAccessToken } = useUser();
    const logout = () => {
        setAccessToken(null);
    };

    return (
        <div className="logoutDiv">
            <BiLogOutCircle className="icon" size="50px" onClick={logout}/>
        </div>
    );


}
export default LogoutIcon;