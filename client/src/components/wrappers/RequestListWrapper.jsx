
import { TailSpin } from "react-loader-spinner";

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
                    <div className="requestItem"> 
                        <p><b>ID:  </b> {request.ID} <b>PROJECT:  </b> {request.Project} <b>TYPE:  </b> {request.Type} <b>AMOUNT:  </b>{request.Amount} {request.Currency} <b>CONCEPT:  </b>{request.Concept} <b>STATE:  </b> {request.State.toString()}</p>
                    </div>
                ))
            )
    )
}

export default RequestsListWrapper;