import { useTranslation } from "react-i18next";
import RowElement from "../atoms/font/RowElement";
import TimelineDrawer from "./Timeline";


const ExpenseData = ({ expense }) => {
    const {t} = useTranslation();

    return (
        <div className="expense-box">
            <div className="table"> 
                <div className="column">
                    <RowElement label="ID" value={expense.ID} />
                    <RowElement label={t("Expense:type")} value={expense.Type} />
                    <RowElement label={t("Expense:amount")} value={`${expense.Amount} ${expense.Currency}`} />
                    <RowElement label={t("Expense:concept")} value={expense.Concept} />
                    <RowElement label={t("Expense:project")} value={expense.Project} />
                    <RowElement label={t("Expense:owner")} value={`${expense.Owner.firstName} ${expense.Owner.lastName} <${expense.Owner.email}>`} />
                    {/* <RowElement label={t("Expense:date")} value={`${new Date(expense.Date).toLocaleString()}`} /> */}
                    
                </div>
                {/* <div className="column">
                    
                    {/* <RowElement label={t("Expense:state")} value={expense.State} /> 
                </div> */}
                <div className="column"> 
                    <TimelineDrawer expense={expense}/>
                </div>
            </div>
            
        </div>
    );
}

export default ExpenseData;