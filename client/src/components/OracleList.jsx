
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./hooks/useUser";
import Selector from "./atoms/inputs/Select";
import RequestsListWrapper from "./organism/RequestListWrapper";

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

    useEffect(() => {
        getTypes();
        getProjects();
        getUsers();
    }, []);

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

    const states = [
        {
            id: '1',
            name: 'APPROVED',
        },
        {
            id: '2',
            name: 'REJECTED',
        },
        {
            id: '3',
            name: 'PENDING',
        },
    ];

    async function getTypes(){
        axios.get(`/server/types`).then((res) => {
            setTypes(res.data.result); 
        }).catch((err) => {
            setError(err)
        })
    }

    async function getProjects(){
        axios.get(`/server/projects`).then((res) => {
            setProjects(res.data.result); 
        }).catch((err) => {
            setError(err)
        })
    }

    async function getUsers(){
        axios.get(`/server/users`).then((res) => {
            setUsers(res.data.result); 
        }).catch((err) => {
            setError(err)
        })
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

    return (
        <div className="requestsDiv">
            <div className="filters"> 
            <h1> Filters </h1>
                <Selector label="Project" setState={setProject} options={projects}/>
                <br/>
                <Selector label="Type" setState={setType} options={types}/>
                <br/>
                <Selector label="State" setState={setRequestState} options={states}/>
                <br/>
                <Selector label="User" setState={setUser} options={users}/>
            </div>
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