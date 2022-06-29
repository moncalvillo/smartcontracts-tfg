import "./css/form.css";
import "./css/App.css";
import "./css/messages.css";

import { UserProvider, useUser } from "./hooks/useUser";
import LoginRegisterWrapper from "./components/LoginRegisterWrapper";


const App = () => {

  return (

      <div className="App">
        
        <div className="container">
          
          <UserProvider >

            <LoginRegisterWrapper />            

          </UserProvider>
        </div>
        
      </div>
  );
    
}

export default App;
