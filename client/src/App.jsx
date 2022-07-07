import "./css/form.css";
import "./css/App.css";
import "./css/messages.css";
import "./css/links.css";
import "./css/requests.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { UserProvider } from "./hooks/useUser";
import Home from "./routes/Home";
import Form from "./routes/Form";
import Requests from "./routes/Requests";
import LogoutIcon from "./components/icons/LogoutIcon";

const App = () => {


  return (

      
        
        <div className="container">
          
          <UserProvider >
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

          </UserProvider>
        </div>
        
  );
    
}

export default App;
