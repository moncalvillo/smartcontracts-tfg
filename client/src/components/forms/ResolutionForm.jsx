import { withSuccess } from "antd/lib/modal/confirm";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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

    const {t} = useTranslation();

    if(loader) return <TailSpin color="grey" height={40}/>;
    if(success) return <div>{t("Common:success")}</div>;
    if(error) return <div className="error">{error}</div>;

    return (
        <form className="form" id="resolution-form" onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <label htmlFor="state">
                <RadioInput label1={t("Common:approve")} label2={t("Common:reject")} opt1="APPROVED" opt2="REJECTED" setState={setState} state={state} />
            </label>
            <label htmlFor="reason">
            {t("Common:reason")}
                <TextAreaInput state={expense.Resolution} placeholder={t("Common:describeReason")} setState={setResolution} />
            </label>
            { !disabled && <button> {t("Common:submit")} </button>}
        </form>
    );

}

export default ResolutionForm;