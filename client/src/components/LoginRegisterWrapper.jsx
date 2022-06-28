import {useState} from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Footer from "./Footer";
import LogoutIcon from "./LogoutIcon";
import ExpenseForm from "./ExpenseForm";
import {useUser} from "../hooks/useUser";

const LoginRegisterWrapper = (props) => {


    const [toggleForm, setToggleForm] = useState(true);
    const {user} = useUser();
    if(user){
        return (
            <>
                <LogoutIcon />
                <ExpenseForm />
                <Footer />
            </>
        );
    }


    if(toggleForm){
        return <LoginForm onLoginRedirect={() => setToggleForm(!toggleForm)} />;
    }
    return <RegisterForm onRegisterRedirect={() => setToggleForm(!toggleForm)}/>;        
}


export default LoginRegisterWrapper;