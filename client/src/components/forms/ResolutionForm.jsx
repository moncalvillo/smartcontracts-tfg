import { withSuccess } from "antd/lib/modal/confirm";
import axios from "axios";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import RadioInput from "../atoms/inputs/RadioInput";
import TextAreaInput from "../atoms/inputs/TextAreaInput"

const ResolutionForm = ({id, inspector, setReload, stateValue = "", resolutionValue = ""}) => {

    const [state, setState] = useState(stateValue || "");
    const [resolution, setResolution] = useState(resolutionValue || "");
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = () => {
        setLoader(true)
        let endpoint;
        if(stateValue && resolutionValue){
            endpoint = "/oracle/update";
        }else{
            endpoint = "/oracle/resolve";
        }
        axios.post(endpoint, {id, state, resolution, inspector}).then((res) => {
            setSuccess(true);
        }).catch((err) => {
            console.log(err.response);
            setError(err.response.data.message);
        }).finally(() => {                
            setLoader(false);
            setReload(true);
        });
    }

    useEffect(()=>{
        if(state === stateValue && resolution === resolutionValue){
            setDisabled(true);
        }
    }, [state, resolution, stateValue, resolutionValue]);


    if(loader) return <TailSpin color="grey" height={40}/>;
    if(success) return <div>Success</div>;
    if(error) return <div className="error">{error}</div>;

    return (
        <form className="form" id="resolution-form" onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <label htmlFor="state">
                <RadioInput label1="Approve" label2="Reject" opt1="APPROVED" opt2="REJECTED" setState={setState} state={state} />
            </label>
            <label htmlFor="reason">
                Reason
                <TextAreaInput state={resolutionValue} placeholder="Describe the reason" setState={setResolution} />
            </label>
            <button disabled={disabled}> Submit </button>
        </form>
    );

}

export default ResolutionForm;