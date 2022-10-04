import { useState, useEffect } from "react";
import axios from "axios";

import {TailSpin} from 'react-loader-spinner';
import { useTranslation } from "react-i18next";

const Form = () => {

    const [expenseType, setExpenseType] = useState("");
    const [project, setProject] = useState("");
    const [concept, setConcept] = useState("");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("CREDUS");

    const [loader, setLoader] = useState(true);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);


    const [types, setTypes] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setLoader(false);
        getProjects();
        getTypes();
    }, []);


    async function getTypes(){
        axios.get(`/server/types`).then((res) => {
            setTypes(res.data.result); 
        }).catch((err) => {
            setError(err)
        });
    }

    async function getProjects(){
        axios.get(`/server/projects`).then((res) => {
            setProjects(res.data.result); 
        }).catch((err) => {
            setError(err)
        })
    }



    const CURRENCIES = [
        "BTC",
        "ETHER",
        "USD",
        "EUR",
        "GBP",
        "CAD",
        "CREDUS"
    ]

    const resetValues = () => {
        setExpenseType("");
        setProject("");
        setConcept("");
        setAmount("");
        setCurrency("CREDUS");
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
        await axios.post("/fabric/expense", data).then((res)=> {
            resetValues();
            setSuccess('Expense created successfully');
            
        }).catch((err)=> {
            setError(err.response.data.message);
            console.log(error);
        }).finally(()=> {
            setLoader(false);
        });
    }

    const {t} = useTranslation();

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
                    <h2> {t("Expense:expense")}</h2> 
                    <label htmlFor="expenseType">
                    {t("Expense:expenseType")}
                    <select
                        className="select"
                        id="expenseType"
                        value={expenseType}
                        onChange={(e) => {setExpenseType(e.target.value);}}>
                        <option />
                        {types.map((type) => (
                            <option key={type.id} value={type.name}>
                                {t(`Common:${type.name}`)}
                            </option>
                        ))}
                    </select>
                    </label>
                    <label htmlFor="project">
                    {t("Expense:project")}
                    <select
                        className="select"
                        id="project"
                        value={project}
                        onChange={(e) => {setProject(e.target.value);}}>
                        <option />
                        {projects.map((p) => (
                            <option key={p.id} value={p.name}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                    </label>
                </div>

                <div className="box">
                    <h2> {t("Expense:balance")} </h2>
                    <label htmlFor="concept">
                    {t("Expense:concept")}
                        <input
                            className="input"
                            id="concept"
                            placeholder={t("Expense:concept")}
                            value={concept}
                            onChange={(e) => {setConcept(e.target.value);}}/>
                    </label>
                    <label htmlFor="amount">
                    {t("Expense:amount")}
                        <input
                            className="input"
                            id="amount"
                            value={amount}
                            type="number"
                            placeholder="00.00"
                            onChange={(e) => {setAmount(e.target.value);}}/>
                    </label>
                    <label htmlFor="currency">
                    {t("Expense:currency")}
                    <select
                        className="select"
                        id="currency"
                        value={currency}
                        onChange={(e) => {setCurrency(e.target.value);}} disabled>
                        <option />
                        {CURRENCIES.map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                        ))}
                    </select>
                    </label>
                </div>
                <button>{t("Common:submit")}</button>
            </form>
        </div>
    );


}

export default Form;