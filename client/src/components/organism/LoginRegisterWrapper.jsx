import {useState} from "react";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";


const Wrapper = (props) => {


    const [toggleForm, setToggleForm] = useState(true);
   


    if(toggleForm){
        return <LoginForm onLoginRedirect={() => setToggleForm(!toggleForm)} />;
    }
    return <RegisterForm onRegisterRedirect={() => setToggleForm(!toggleForm)}/>;        
}


export default Wrapper;