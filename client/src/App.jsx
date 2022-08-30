import "./css/form.css";
import "./css/App.css";
import "./css/messages.css";
import "./css/links.css";
import "./css/requests.css";
import axios from "axios";

import { UserProvider } from "./components/hooks/useUser";
import Router from "./components/routes/Router";


const App = () => {

  axios.defaults.baseURL = 'http://localhost:8080/api';
  return (

      
        
        <div className="container">
          
          <UserProvider >
            <Router />  
          </UserProvider>
        </div>
        
  );
    
}

export default App;
