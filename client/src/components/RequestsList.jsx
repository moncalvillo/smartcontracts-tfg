
import { TailSpin } from "react-loader-spinner";
import { useState, useEffect } from "react";
import axios from "axios";

const RequestsList = (props) => {


    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // getRequests();
    }, []);

    async function getRequests(){

        axios.get("http://localhost:8080/api/requests").then((res)=>{
            setRequests(res.data);
        }).catch((err)=>{
            setError(err);
        }).finally(()=>{
            setLoading(false);
        })
    }

    if(loading){

        return ( 
            <div className="requestsDiv">
                <div className="loading"> <TailSpin color="grey" height={40}/>  </div> 
            </div>
        )
    }

    if(error){
        return (
            <div className="requestsDiv">
                <div className="error"> {error.message} </div>
            </div>
        );
    }

    return (
        <div className="requestsDiv">

            <h1> Requests </h1>
            <div className="requests">
                {/* {!requests.length ? (
                        <h1> No pets found.</h1>
                    ) : (
                        requests.map((request) => (
                            <p> {request.id} {request.project} {request.amount} {request.accepted}</p>
                            
                        ))
                    )} */}
                
                <div className="requestItem">
                    Request 1
                </div>
                <div className="requestItem">
                    Request 2
                </div>
                <div className="requestItem">
                    Request 3
                </div>
            </div>


        </div>
    );




}

export default RequestsList;