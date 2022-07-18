import axios from "axios";
import { useUser } from "../hooks/useUser";

import Home from "./Home";
import Form from "./Form";
import Requests from "./Requests";
import LogoutIcon from "../components/icons/LogoutIcon";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


const RouterComponent = () => {


    const { setAccessToken } = useUser();

    axios.interceptors.response.use(undefined, (error) => {
        if(error.response.status === 403) {
            setAccessToken(null);
        }
    });

    axios.defaults.baseURL = 'http://localhost:8080/api';
    axios.defaults.headers.common['Authorization'] = `token ${localStorage.getItem('access_token')}`;

    return (
        <Router>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/form" element={<Form />} />
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
              <LogoutIcon />
              
        </Router>
    );

}

export default RouterComponent;