import "./css/form.css";
import "./css/App.css";
import "./css/messages.css";
import "./css/links.css";
import "./css/requests.css";
import axios from "axios";
import './utils/i18n/i18next'

import { UserProvider } from "./components/hooks/useUser";
import Router from "./components/routes/Router";


const App = () => {

  const API_URL = process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8080/api";
  // axios.defaults.headers = {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  // }
  axios.defaults.baseURL = API_URL;
  return (

      
        
        <div className="container">
          
          <UserProvider >
            <Router />  
          </UserProvider>
        </div>
        
  );
    
}

export default App;
