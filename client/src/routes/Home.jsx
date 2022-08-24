
import FormLink from "../components/links/FormLink";
import RequestsLink from "../components/links/RequestsLink";
import { Link } from 'react-router-dom';
import { useUser } from "../hooks/useUser";
const Home = () => {

    const { user } = useUser();

    return (
        <div className="linksSection">
            
            <div className="linksDiv"> 
                {user.roleType ==="user" && <Link to="/form" >
                    <FormLink />
                </Link>}

                <Link to="/requests" >
                    <RequestsLink />
                </Link>
            </div>
        </div>
    );

}

export default Home;