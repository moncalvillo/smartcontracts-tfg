import { useState } from "react";
import RowElement from "../atoms/font/RowElement";
import ResolutionForm from "../forms/ResolutionForm";
import { useUser } from "../hooks/useUser";


const ExpenseSolver = ({expense, setReload}) => {


    const { user} = useUser(); 

    const [update, setUpdate] = useState(false);

    
    if(((expense.State === "PENDING" && !expense.Resolution) || update) && user.roleType !== 'user'){
        return (
            <>
                {update ? <> 
                        <h2> Update </h2> 
                        <h3> Last inspector: {`${expense.Inspector.firstName} ${expense.Inspector.lastName} <${expense.Inspector.email}>`} </h3> 
                    </> 
                    : <h2>Resolve</h2>}
                <div className="expense-box">
                    <ResolutionForm setReload={setReload} expense={expense} />
                </div>
                { update && <button onClick={() => setUpdate(false)}> Cancel update </button> }
            </>
        );
    }

    if(expense.Resolution && expense.Inspector){
        const value = expense.Inspector.name ? expense.Inspector.name : `${expense.Inspector.firstName} ${expense.Inspector.lastName} <${expense.Inspector.email}>`
        return (
            <>
                <h2>Resolution</h2>
                <div className="expense-box">
                    <RowElement label="Inspector" value={value} />
                    <RowElement style={{ fontSize: "16px"}} label="Reason" value={expense.Resolution} />
                </div>
                { user.roleType !== user &&  <button onClick={() => setUpdate(true)}>Update</button>}
            </>
        );
    }

    

}

export default ExpenseSolver;