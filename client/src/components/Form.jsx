import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import {TailSpin} from 'react-loader-spinner';

const Form = () => {

    const [expenseType, setExpenseType] = useState("");
    const [project, setProject] = useState("");
    const [concept, setConcept] = useState("");
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {
        setLoading(false);
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

    const handleSubmit = async () => {
        setLoading(true);
        const data = {
            project: project,
            expenseType: expenseType,
            concept: concept,
            amount: amount,
            currency: currency,
            date: new Date(),
        }
        console.log(data);
        await axios.post("http://localhost:8080/api/form", data).then((res)=> {
            if(res.status === 200) {
                console.log(res);
            }
            setTimeout(() => {
                setLoading(false);
                alert("Form submitted successfully");
            }, 2000);
            
        }).catch((err)=> {
            setError(err.response.data.message);
            setLoading(false);
            console.log(error);
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
                    loading ?  <div className="loading"> <TailSpin color="grey" height={40}/>  </div> : null
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
                <button >Submit</button>
            </form>
        </div>
    );


}

export default Form;