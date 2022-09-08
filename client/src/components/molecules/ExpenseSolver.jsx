import RowElement from "../atoms/font/RowElement";
import ResolutionForm from "../forms/ResolutionForm";
import { useUser } from "../hooks/useUser";


const ExpenseSolver = ({expense, setReload}) => {


    const { user} = useUser(); 

    if(expense.Resolution && expense.Inspector){
        return (
            <>
                <h2>Resolution</h2>
                <div className="expense-box">
                    <RowElement label="Inspector" value={expense.Inspector} />
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