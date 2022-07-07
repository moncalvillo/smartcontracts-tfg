
import FormLink from "../components/links/FormLink";
import RequestsLink from "../components/links/RequestsLink";
import { Link } from 'react-router-dom';
const Home = () => {



    return (
        <div className="linksSection">
            
            <div className="linksDiv"> 
                <Link to="/form" >
                    <FormLink />
                </Link>

                <Link to="/requests" >
                    <RequestsLink />
                </Link>
            </div>
        </div>
    );

}

export default Home;