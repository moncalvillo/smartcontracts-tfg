import BackwardsIcon from "../atoms/icons/BackwardsIcon";
import ExpenseForm from "../forms/ExpenseForm";
import { useUser } from "../hooks/useUser";
import ManagerFormWrapper from "../organism/ManagerFormWrapper";


const Form = () => {


    const { user } = useUser();

    if(user.roleType !== "user"){
        return (
            <>
                <BackwardsIcon />
                <ManagerFormWrapper />
            </>
        );
    }

    if(user.roleType !== "manager"){
        return (
            <>
                <BackwardsIcon />
                <ExpenseForm />
            </>
        );
    }

}

export default Form;