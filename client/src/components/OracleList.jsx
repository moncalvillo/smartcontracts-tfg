
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./hooks/useUser";
import Selector from "./atoms/inputs/Select";
import RequestsListWrapper from "./organism/RequestListWrapper";
import FiltersWrapper from "./organism/FiltersWrapper";

const OracleList = (props) => {


    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [types, setTypes] = useState([]);
    const [type, setType] = useState("");
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState("");
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("");
    const [requestState, setRequestState] = useState("");


    const {currentUser} = useUser();

    useEffect(()=>{
        getRequests();
    }, [type,project,requestState,user]);

    const params = {
        type: type,
        project: project,
        state: requestState,
        user: user,
        currentUser: currentUser,
    }

    

    async function getRequests(){
        setLoading(true);
        axios.get("http://localhost:8081/fabric/expenses", {
            params: params,
        }).then((res)=>{
            setRequests({
                ID: "123",
                Type: "Type",
                Project: "Project",
                State: "PENDING",
                Amount: 5000,
                Currency: "USD",
                Date: "Date",
                Concept: "Concept",
            })
            // setRequests(res.data.result);
        }).catch((err)=>{
            setRequests({
                ID: "123",
                Type: "Type",
                Project: "Project",
                State: "PENDING",
                Amount: 5000,
                Currency: "USD",
                Date: "Date",
                Concept: "Concept",
            })
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
    }
    return (
        <div className="requestsDiv">
            <FiltersWrapper props={filterProps} />
            <div className="requestsList">

                <h1> Expense requests </h1>
                <div className="requests">
                    <RequestsListWrapper loading={loading} error={error} requests={requests}/>
                </div>
            </div>


        </div>
    );




}

export default OracleList;