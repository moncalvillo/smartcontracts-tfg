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
            return <FcAlarmClock size={"30px"}/>
        }
        if(state ==="APROVED"){
            return <FcApproval size={"30px"}/>
        }
        if(state ==="REJECTED"){
            return <FcCancel size={"30px"}/>
        }

    }

    return (
        <div className="requestItem" onClick={handleOnClick}> 
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
            </div> 
            {active && <> <ResolveButton id={request.ID}/> <IoIosArrowUp /></>}
        </div>
    );

}

export default RequestModal;