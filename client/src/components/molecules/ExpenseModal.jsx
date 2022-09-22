import { useState } from "react";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {FcApproval, FcCancel, FcAlarmClock} from "react-icons/fc";
import ResolveButton from "../atoms/buttons/ResolveButton";



const RequestModal =  ({request}) => {
    const [active, setActive] = useState(false);

    const handleOnClick = () =>{
        setActive(!active);
    }

    const iconState = (state) => {
        if(state ==="PENDING"){
            // console.log(document.getElementById(request.ID).style)
            // document.getElementById(request.ID).style.className = ("pending");
            return <FcAlarmClock size={"30px"}/>
        }
        if(state ==="APPROVED"){
            // document.getElementById(request.ID).style.className = ("approved");
            // console.log(document.getElementById(request.ID).style.)
            return <FcApproval size={"30px"}/>
        }
        if(state ==="REJECTED"){
            // document.getElementById(request.ID).style.className. = ("rejected");
            // console.log(document.getElementById(request.ID).style)
            return <FcCancel size={"30px"}/>
        }

    }

    return (
        <div className="requestItem" id={request.ID} onClick={handleOnClick}> 
            <div className="requestHeader">
                <p>Project:  <b> {request.Project} </b> </p>
                <p> Type:  <b> {request.Type} </b> </p>
                <p> Amount:  <b>{request.Amount} {request.Currency} </b> </p>
                <p className="reqIcon"> {iconState(request.State.toString())} </p>
            </div>
            {!active && <> <ResolveButton id={request.ID}/> <IoIosArrowDown /> </>}
            <div className={active ? 'toggleRequest': 'inactive'}>
                <p><b>ID:  </b> {request.ID} </p>
                <p> <b>Concept:  </b>{request.Concept}  </p> 
                <p> <b>Date: </b> {request.Date} </p>
                <p> <b>Owner: </b> {request.Owner.name ? request.Owner.name : `${request.Owner.firstName} ${request.Owner.lastName} <${request.Owner.email}>`} </p>
            </div> 
            {active && <> <ResolveButton id={request.ID}/> <IoIosArrowUp /></>}
        </div>
    );

}

export default RequestModal;