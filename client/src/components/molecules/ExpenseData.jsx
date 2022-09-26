import { useTranslation } from "react-i18next";
import RowElement from "../atoms/font/RowElement";


const ExpenseData = ({ expense }) => {
    const {t} = useTranslation();

    return (
        <div className="expense-box">
            <div className="column">
                <RowElement label="ID" value={expense.ID} />
                <RowElement label={t("Expense:type")} value={expense.Type} />
                <RowElement label={t("Expense:amount")} value={`${expense.Amount} ${expense.Currency}`} />
                <RowElement label={t("Expense:date")} value={expense.Date} />
                
            </div>
            <div className="column">
                <RowElement label={t("Expense:concept")} value={expense.Concept} />
                <RowElement label={t("Expense:project")} value={expense.Project} />
                <RowElement label={t("Expense:owner")} value={`${expense.Owner.firstName} ${expense.Owner.lastName} <${expense.Owner.email}>`} />
                <RowElement label={t("Expense:state")} value={expense.State} />
            </div>
        </div>
    );
}

export default ExpenseData;