
import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseListWrapper from "./organism/ExpenseListWrapper";
import FiltersWrapper from "./organism/FiltersWrapper";

const OracleList = (props) => {


    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [type, setType] = useState("");
    const [project, setProject] = useState("");
    const [user, setUser] = useState("");
    const [requestState, setRequestState] = useState("");



    useEffect(()=>{
        getRequests();
    }, [type,project,requestState,user]);

    const params = {
        type: type,
        project: project,
        state: requestState,
        user: user,
    }

    

    async function getRequests(){
        setLoading(true);
        axios.get("http://localhost:8081/oracle/pending", {
            params: params,
        }).then((res)=>{
            console.log(res.data.result)
            setRequests(res.data.result);
        }).catch((err)=>{
            console.log(err.response.data);
            // setError(err.response.data.message);
        }).finally(()=>{
            setLoading(false);
        })
    }

    const filterProps = {
        setType,
        setProject,
        setRequestState,
        setUser,
        setError,
        oracle: true,
    }
    return (
        <div className="requestsDiv">
            <FiltersWrapper {...filterProps} />
            <div className="requestsList">

                <h1> Expense requests </h1>
                <div className="requests">
                    <ExpenseListWrapper loading={loading} error={error} requests={requests}/>
                </div>
            </div>


        </div>
    );




}

export default OracleList;