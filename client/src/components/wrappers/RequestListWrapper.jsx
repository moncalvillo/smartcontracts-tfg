
import { TailSpin } from "react-loader-spinner";
import Request from "../Request";

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
                    <Request request={request}/> 
                ))
            )
    )
}

export default RequestsListWrapper;