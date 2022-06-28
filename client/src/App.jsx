import Footer from "./components/Footer";

import "./css/form.css";
import "./css/App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import Login from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { UserProvider, useUser } from "./hooks/useUser";
import LogoutIcon from "./components/LogoutIcon";


const App = () => {

  const [toggleForm, setToggleForm] = useState(true);
  const accessToken = localStorage.getItem("access_token");
  return (

      <div className="App">
        
        <div className="container">
          
          <UserProvider >


            {
              accessToken ? (
                <>
                  <LogoutIcon />
                  <ExpenseForm />
                  <Footer />
                </>
              ) : (
                toggleForm ? <Login onLoginRedirect={() => setToggleForm(!toggleForm)} /> : <RegisterForm onRegisterRedirect={() => setToggleForm(!toggleForm)}/>
              )
            }
            

          </UserProvider>
        </div>
        
      </div>
  );
    
}

export default App;
