import { withSuccess } from "antd/lib/modal/confirm";
import axios from "axios";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import RadioInput from "../atoms/inputs/RadioInput";
import TextAreaInput from "../atoms/inputs/TextAreaInput"

const ResolutionForm = ({expense, setReload}) => {

    const [state, setState] = useState(expense.State || "");
    const [resolution, setResolution] = useState(expense.Resolution || "");
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = () => {
        setLoader(true)
        axios.post("http://localhost:8081/oracle/resolve", {id: expense.ID, state, resolution}).then((res) => {
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

        if(state === expense.State && resolution === expense.Resolution){
            setDisabled(true);
        }else{
            setDisabled(false);
        }
    }, [state, resolution, expense.State,  expense.Resolution]);


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
                <TextAreaInput state={expense.Resolution} placeholder="Describe the reason" setState={setResolution} />
            </label>
            { !disabled && <button> Submit </button>}
        </form>
    );

}

export default ResolutionForm;