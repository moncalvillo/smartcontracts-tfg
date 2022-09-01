import axios from "axios";
import { useUser } from "../hooks/useUser";

import Home from "./Home";
import Form from "./Form";
import Requests from "./Requests";
import LogoutIcon from "../atoms/icons/LogoutIcon";
import ProfileName from "../ProfileName";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ResolveRequest from "./ResolveRequest";
import Oracle from "./Oracle";


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
                  { user.roleType !== "manager" && <Route path="/form" element={<Form />} />}
                  { user.roleType !== "user" && <Route path="/oracle" element={<Oracle />} />}
                  <Route path="/requests/:id" element={<ResolveRequest />} />
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