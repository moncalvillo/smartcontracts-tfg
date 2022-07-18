import { useState, useEffect } from "react";
import axios from "axios";

import {TailSpin} from 'react-loader-spinner';

const Form = () => {

    const [expenseType, setExpenseType] = useState(null);
    const [project, setProject] = useState(null);
    const [concept, setConcept] = useState(null);
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState(null);

    const [loader, setLoader] = useState(true);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        setLoader(false);
    }, []);



    const PROJECTS = [
        "Project 1",
        "Project 2",
        "Project 3",
        "Project 4",
    ]

    const CURRENCIES = [
        "BTC",
        "ETHER",
        "USD",
        "EUR",
        "GBP",
        "CAD",
    ]

    const resetValues = () => {
        setExpenseType(null);
        setProject(null);
        setConcept(null);
        setAmount(0);
        setCurrency(null);
    }
    
    const handleSubmit = async () => {
        setLoader(true);
        const data = {
            project: project,
            expenseType: expenseType,
            concept: concept,
            amount: amount,
            currency: currency,
            date: new Date(),
        }
        await axios.post("/fabric/test", data).then((res)=> {
            console.log(res);
            resetValues();
            setSuccess('Expense created successfully');
            
        }).catch((err)=> {
            setError(err.response.data.message);
            console.log(error);
        }).finally(()=> {
            setLoader(false);
        });
    }

  

    return (
        <div className="formDiv">
            
            <form className="form" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();

                }
                }>
                
                {
                    loader &&  <div className="loading"> <TailSpin color="grey" height={40}/>  </div> 
                }
                {
                    error && <div className="error"> {error} </div> 
                }
                {
                    success && <div className="success"> {success} </div>
                }

                
                
                <div className="box">
                    <h2> Institution</h2> 
                    <label htmlFor="expenseType">
                    Type of expense
                    <input
                        className="input"
                        id="expenseType"
                        placeholder="Type of expense"
                        onBlur={(e) => {setExpenseType(e.target.value);}}/>
                    </label>
                    <label htmlFor="project">
                    Project
                    <select
                        className="select"
                        id="project"
                        onBlur={(e) => {setProject(e.target.value);}}>
                        <option />
                        {PROJECTS.map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                        ))}
                    </select>
                    </label>
                </div>

                <div className="box">
                    <h2> Cash balance </h2>
                    <label htmlFor="concept">
                    Concept
                        <input
                            className="input"
                            id="concept"
                            placeholder="Concept"
                            onBlur={(e) => {setConcept(e.target.value);}}/>
                    </label>
                    <label htmlFor="amount">
                    Amount
                        <input
                            className="input"
                            id="amount"
                            type="number"
                            placeholder="00.00"
                            onBlur={(e) => {setAmount(e.target.value);}}/>
                    </label>
                    <label htmlFor="currency">
                    Currency
                    <select
                        className="select"
                        id="currency"
                        onBlur={(e) => {setCurrency(e.target.value);}}>
                        <option />
                        {CURRENCIES.map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                        ))}
                    </select>
                    </label>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );


}

export default Form;