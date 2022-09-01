
import FormLink from "../molecules/links/FormLink";
import RequestsLink from "../molecules/links/RequestsLink";
import { Link } from 'react-router-dom';
import { useUser } from "../hooks/useUser";
import OracleLink from "../molecules/links/OracleLink";
const Home = () => {

    const { user } = useUser();

    return (
        <div className="linksSection">
            
            <div className="linksDiv"> 
                {user.roleType ==="user" && <Link to="/form" >
                    <FormLink />
                </Link>}
                {user.roleType ==="manager" && <Link to="/oracle" >
                    <OracleLink />
                </Link>}
                <Link to="/requests" >
                    <RequestsLink />
                </Link>
            </div>
        </div>
    );

}

export default Home;