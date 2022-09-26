
import { useTranslation } from "react-i18next";
import { TailSpin } from "react-loader-spinner";
import ExpenseModal from "../molecules/ExpenseModal";

const RequestsListWrapper = (props) => {
    const {t} = useTranslation();

    if (props.error){
        return (
            <div className="error"> {props.error.message} </div>
        );
    }

    if(props.loading){
        return (
            <div className="loading"> <TailSpin color="grey" height={40}/>  </div> 
        );
    }


    return (
        !props.requests.length  ? (
                <div className="requestItem"> 
                    <h2> {t("Common:noRequests")} </h2>
                </div>
            ) : (
                props.requests.map((request) => (
                    <ExpenseModal key={request.ID} request={request}/> 
                ))
            )
    )
}

export default RequestsListWrapper;