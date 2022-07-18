
import { useState, useEffect } from "react";
import axios from "axios";
import Selector from "./Select";
import RequestsListWrapper from "./wrappers/RequestListWrapper";

const RequestsList = (props) => {


    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [types, setTypes] = useState([]);
    const [type, setType] = useState("");
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState("");
    const [requestState, setRequestState] = useState("");

    useEffect(() => {
        getTypes();
        getProjects();
    }, []);

    


    useEffect(()=>{
        getRequests();
    }, [type,project,requestState]);


    const params = {
        type: type,
        project: project,
        state: requestState,
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
        // setProjects(["Project 1", "Project 2", "Project 3", "Project 4"]);
    }

    async function getRequests(){
        setLoading(true);
        axios.get("/fabric/expenses", {
            params: params,
        }).then((res)=>{
            setRequests(res.data.result);
        }).catch((err)=>{
            console.log(err);
            setError(err.response.data.message);
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
            </div>
            <div className="requestsList">

                <h1> Requests </h1>
                <div className="requests">
                    <RequestsListWrapper loading={loading} error={error} requests={requests}/>
                </div>
            </div>


        </div>
    );




}

export default RequestsList;