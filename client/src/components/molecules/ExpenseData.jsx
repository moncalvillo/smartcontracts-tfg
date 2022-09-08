import RowElement from "../atoms/font/RowElement";


const ExpenseData = ({ expense }) => {

    return (
        <div className="expense-box">
            <div className="column">
                <RowElement label="ID" value={expense.ID} />
                <RowElement label="Type" value={expense.Type} />
                <RowElement label="Amount" value={`${expense.Amount} ${expense.Currency}`} />
                <RowElement label="Date" value={expense.Date} />
                
            </div>
            <div className="column">
                <RowElement label="Concept" value={expense.Concept} />
                <RowElement label="Project" value={expense.Project} />
                <RowElement label="Date" value={expense.Date} />
                <RowElement label="State" value={expense.State} />
            </div>
        </div>
    );
}

export default ExpenseData;