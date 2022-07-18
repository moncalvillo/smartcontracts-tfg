import "./css/form.css";
import "./css/App.css";
import "./css/messages.css";
import "./css/links.css";
import "./css/requests.css";

import { UserProvider } from "./hooks/useUser";
import Router from "./routes/Router";


const App = () => {

  return (

      
        
        <div className="container">
          
          <UserProvider >
            <Router />  
          </UserProvider>
        </div>
        
  );
    
}

export default App;
