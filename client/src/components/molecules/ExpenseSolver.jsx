import { useState } from "react";
import { useTranslation } from "react-i18next";
import RowElement from "../atoms/font/RowElement";
import ResolutionForm from "../forms/ResolutionForm";
import { useUser } from "../hooks/useUser";


const ExpenseSolver = ({expense,reload, setReload}) => {


    const { user} = useUser(); 

    const [update, setUpdate] = useState(false);
    const {t} = useTranslation();
    

    if(((expense.State === "PENDING" && !expense.Resolution) || update) && user.roleType !== 'user'){

        return (
            <>
                {update ? <> 
                        <h2> {t("Common:update")} </h2> 
                        <h3> {t("Common:inspector")}: {expense.Inspector.name ? expense.Inspector.name : `${expense.Inspector.firstName} ${expense.Inspector.lastName} (${expense.Inspector.email})`} </h3> 
                    </> 
                    : <h2>{t("Common:resolve")}</h2>}
                <div className="expense-box">
                    <ResolutionForm setReload={setReload} reload={reload} expense={expense} />
                </div>
                { update && <button onClick={() => setUpdate(false)}> {t("Common:cancelUpdate")} </button> }
            </>
        );
    }

    if(expense.Resolution && expense.Inspector){
        const value = expense.Inspector.name ? expense.Inspector.name : `${expense.Inspector.firstName} ${expense.Inspector.lastName} (${expense.Inspector.email})`
        return (
            <>
                <h2>{t("Expense:resolution")}</h2>
                <div className="expense-box">
                    <RowElement label={t("Common:inspector")} value={value} />
                    <RowElement label={t("Common:resolvedAt")} value={!expense.updateAt ? `${new Date(expense.resolvedAt).toLocaleString()}` : `${new Date(expense.updateAt).toLocaleString()}`} />
                    <RowElement style={{ fontSize: "16px"}} label={t("Common:reason")} value={expense.Resolution} />
                </div>
                { user.roleType !== "user" &&  <button onClick={() => setUpdate(true)}>{t("Common:update")}</button>}
            </>
        );
    }

    

}

export default ExpenseSolver;