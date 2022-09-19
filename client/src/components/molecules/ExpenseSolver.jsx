import RowElement from "../atoms/font/RowElement";
import ResolutionForm from "../forms/ResolutionForm";
import { useUser } from "../hooks/useUser";


const ExpenseSolver = ({expense, setReload}) => {


    const { user} = useUser(); 
    console.log(expense);
    
    if(expense.Resolution && expense.Inspector){
        const value = expense.Inspector.name ? expense.Inspector.name : `${expense.Inspector.firstName} ${expense.Inspector.lastName} <${expense.Inspector.email}>`
        return (
            <>
                <h2>Resolution</h2>
                <div className="expense-box">
                    <RowElement label="Inspector" value={value} />
                    <RowElement label="Reason" value={expense.Resolution} />
                </div>
            </>
        );
    }

    if(expense.State === "PENDING" && !expense.Resolution && user.roleType !== 'user'){
        return (
            <>
                <h2>Resolve</h2>
                <div className="expense-box">
                    <ResolutionForm id={expense.ID} inspector={user.wallet} setReload={setReload} />
                </div>
            </>
        );
    }

}

export default ExpenseSolver;