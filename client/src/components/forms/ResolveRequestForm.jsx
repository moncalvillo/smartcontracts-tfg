

import { useState } from "react";
import axios from "axios";

import {TailSpin} from 'react-loader-spinner';
import RadioInput from "../atoms/inputs/RadioInput";
import TextAreaInput from "../atoms/inputs/TextAreaInput";
import { useUser } from "../hooks/useUser";
import LoadingPage from "../organism/LoadingPage";

const ResolveRequestForm = ({request}) => {
    
    const [loader, setLoader] = useState(true);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [state, setState] = useState("");
    const [inspector, setInspector] = useState("");
    const [resolution, setResolution] = useState("");

    const onValueChange = (e) => {
        setState(e.target.value);
    }

    const {user} = useUser();

    const expense = {
        ID: request.ID,
        state: state,
        inspector: inspector,
        resolution: resolution
        
    }

    const handleSubmit = async () => {
        setLoader(true);
        await axios.post("http://localhost:8081/oracle/resolve", { expense }).then((res)=> {
            setSuccess('Expense created successfully');
            
        }).catch((err)=> {
            // setError(err.response.data.message);
            // console.log(error);
        }).finally(()=> {
            // setLoader(false);
        });
    }

    if(loader){
        return (
            <LoadingPage />
        );
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
                    <h2> Resolve Request </h2> 
                    <label htmlFor="state">
                        <RadioInput otp1="Approve" opt2="Reject" onValueChange={onValueChange} state={state}/>
                    </label>
                    <label htmlFor="reason"> 
                        Reason
                        <TextAreaInput palceholder="Resolution reason" setState={setResolution} />
                    </label>
                    <label htmlFor="inspector"> 
                        Inspector
                        <input type="read-only" value={user.email} />
                    </label>
                </div>
                <button>Submit</button> 
            </form>
        </div>
    );


}

export default ResolveRequestForm;