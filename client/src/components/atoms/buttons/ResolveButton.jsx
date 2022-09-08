import { Link } from "react-router-dom";


const ResolveButton = ({ id }) => {

    const path = `/expenses/${id}`;

    return(
        <Link to={path}>
            <button className="requestButton">
                Go to request
            </button>
        </Link>
    );

}

export default ResolveButton;