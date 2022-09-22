
import { TailSpin } from "react-loader-spinner";
import ExpenseModal from "../molecules/ExpenseModal";

const RequestsListWrapper = (props) => {

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
                    <h2> No requests found </h2>
                </div>
            ) : (
                props.requests.map((request) => (
                    <ExpenseModal key={request.ID} request={request}/> 
                ))
            )
    )
}

export default RequestsListWrapper;