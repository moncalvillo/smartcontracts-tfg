import { withSuccess } from "antd/lib/modal/confirm";
import axios from "axios";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import RadioInput from "../atoms/inputs/RadioInput";
import TextAreaInput from "../atoms/inputs/TextAreaInput"

const ResolutionForm = ({id, inspector, setReload}) => {

    const [state, setState] = useState("");
    const [resolution, setResolution] = useState("");
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);


    const handleSubmit = () => {
        setLoader(true)
        axios.post("http://localhost:8081/oracle/resolve", {id, state, resolution, inspector}).then((res) => {
            setSuccess(true);
        }).catch((err) => {
            console.log(err.response);
            setError(err.response.data.message);
        }).finally(() => {                
            setLoader(false);
            setReload(true);
        });
    }


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
                <TextAreaInput placeholder="Describe the reason" setState={setResolution} />
            </label>
            <button> Submit </button>
        </form>
    );

}

export default ResolutionForm;