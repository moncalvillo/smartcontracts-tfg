import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import "../../css/expense.css";
import ExpenseData from "../molecules/ExpenseData";
import ExpenseSolver from "../molecules/ExpenseSolver";

const Request = () => {

    const {id} = useParams();
    const [loader, setLoader] = useState(true);
    const [expense, setExpense] = useState(null);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        setLoader(true);
        getExpense();
    } , [reload]);

    const getExpense = async () => {
        axios.get(`/fabric/expense`, { params : {
            id: id
        }}).then((res)=> {
            setExpense(res.data.result);
        }).catch((err)=> {
            console.log(err);
        }).finally(()=> {
            setLoader(false);
        } );
    }

    if(!expense || loader) {
        return <LoadingPage />
    }else{
        return (
            <div className="expense-div">
                <div className="expenseData">
                    <h2>Request </h2>
                    <h1> { expense.ID } </h1>
                    <ExpenseData expense={expense}/>
                </div>
                <div className="expenseSolver"> 
                    <ExpenseSolver expense={expense} setReload={setReload}/>
                </div>
            </div>
        );
    }

}

export default Request;


