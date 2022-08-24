import axios from "axios";
import { useUser } from "../hooks/useUser";

import Home from "./Home";
import Form from "./Form";
import Requests from "./Requests";
import LogoutIcon from "../components/icons/LogoutIcon";
import ProfileName from "../components/ProfileName";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


const RouterComponent = () => {


    const { user, setUser } = useUser();

    axios.interceptors.response.use(undefined, (error) => {
        if(error.response.status === 401 || 403) {
          setUser(null)
        }
    });

    
    axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('access_token')}`;

    return (
        <Router>
              <Routes>
                  <Route path="/" element={<Home />} />
                  { user.roleType === "user" && <Route path="/form" element={<Form />} />}
                  <Route path="/requests" element={<Requests />} />
                  <Route
                    path="*"
                    element={
                      <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                      </main>
                    }
                  />
              </Routes>
              <ProfileName />
              <LogoutIcon />
              
        </Router>
    );

}

export default RouterComponent;