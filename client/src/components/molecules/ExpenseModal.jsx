import { useState } from "react";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {FcApproval, FcCancel, FcAlarmClock} from "react-icons/fc";
import ResolveButton from "../atoms/buttons/ResolveButton";
import { useTranslation } from "react-i18next";



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
    const {t} = useTranslation();
    return (
        <div className="requestItem" id={request.ID} onClick={handleOnClick}> 
            <div className="requestHeader">
                <p>{t("Expense:project")}:  <b> {request.Project} </b> </p>
                <p> {t("Expense:type")}:  <b> {t(`Common:${request.Type}`)} </b> </p>
                <p> {t("Expense:amount")}:  <b>{request.Amount} {request.Currency} </b> </p>
                <p className="reqIcon"> {iconState(request.State.toString())} </p>
            </div>
            {!active && <> <ResolveButton id={request.ID}/> <IoIosArrowDown /> </>}
            <div className={active ? 'toggleRequest': 'inactive'}>
                <p><b>ID:  </b> {request.ID} </p>
                <p> <b>{t("Expense:concept")}:  </b>{request.Concept}  </p> 
                <p> <b>{t("Expense:date")}: </b> {`${new Date(request.createdAt).toLocaleString()}`} </p>
                <p> <b>{t("Expense:owner")}: </b> {request.Owner.name ? request.Owner.name : `${request.Owner.firstName} ${request.Owner.lastName} <${request.Owner.email}>`} </p>
            </div> 
            {active && <> <ResolveButton id={request.ID}/> <IoIosArrowUp /></>}
        </div>
    );

}

export default RequestModal;