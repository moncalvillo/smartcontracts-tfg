import Footer from "./components/Footer";

import "./css/form.css";
import "./css/App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import Login from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { UserProvider, useUser } from "./hooks/useUser";


const App = () => {

  const [toggleForm, setToggleForm] = useState(true);
  const {user} = useUser(); 

  return (

      <div className="App">
        
        <div className="container">
          <UserProvider >


            {
              user.name ? (
                <>
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
