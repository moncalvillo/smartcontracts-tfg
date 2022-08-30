import {TiArrowBackOutline} from 'react-icons/ti';
import {useNavigate} from 'react-router-dom';
const BackwardsIcon = () => {

    let navigate = useNavigate();

    return (
        <div className="backwardsDiv">
            <TiArrowBackOutline className="icon" size="50px" onClick={() => navigate(-1)}/>
        </div>
    );


}
export default BackwardsIcon;