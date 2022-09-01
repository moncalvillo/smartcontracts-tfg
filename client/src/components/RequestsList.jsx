
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./hooks/useUser";
import RequestsListWrapper from "./organism/RequestListWrapper";
import FiltersWrapper from "./organism/FiltersWrapper";

const RequestsList = () => {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [type, setType] = useState("");
    const [project, setProject] = useState("");
    const [requestState, setRequestState] = useState("");

    const {user} = useUser();

    useEffect(()=>{
        getRequests();
    }, [type,project,requestState]);


    const params = {
        type: type,
        project: project,
        state: requestState,
        user: user,
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

    const filterProps = {
        setType,
        setProject,
        setRequestState,
        setError,
    }

    return (
        <div className="requestsDiv">
            <FiltersWrapper {...filterProps} />
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