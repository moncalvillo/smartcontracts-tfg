import { useState } from "react";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
const Request =  ({request}) => {
    const [active, setActive] = useState(false);

    const handleOnClick = () =>{
        setActive(!active);
    }

    return (
        <div className="requestItem" onClick={handleOnClick}> 
            <p><b>PROJECT:  </b> {request.Project} <b>TYPE:  </b> {request.Type} <b>AMOUNT:  </b>{request.Amount} {request.Currency} <b>STATE:  </b> {request.State.toString()}</p>
            {!active && <IoIosArrowDown />}
            <div className={active ? 'toggleRequest': 'inactive'}>
                <p><b>ID:  </b> {request.ID} </p>
                <p> <b>CONCEPT:  </b>{request.Concept}  </p> 
                <p> <b>DATE: </b> {request.Date} </p>
            </div> 
            {active && <IoIosArrowUp />}
        </div>
    );

}

export default Request;