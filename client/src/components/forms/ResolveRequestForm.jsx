

import { useState, useEffect } from "react";
import axios from "axios";

import {TailSpin} from 'react-loader-spinner';

const ResolveRequestForm = ({request}) => {
    
    const [loader, setLoader] = useState(true);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        
        await axios.post("/fabric/expense/resolve").then((res)=> {
            // resetValues();
            // setSuccess('Expense created successfully');
            
        }).catch((err)=> {
            // setError(err.response.data.message);
            // console.log(error);
        }).finally(()=> {
            // setLoader(false);
        });
    }

  

    return (
        <div className="formDiv">
            
            <form className="form" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();

                }
                }>
                
                {
                    loader &&  <div className="loading"> <TailSpin color="grey" height={40}/>  </div> 
                }
                {
                    error && <div className="error"> {error} </div> 
                }
                {
                    success && <div className="success"> {success} </div>
                }
                
                <div className="box">
                    <h2>Resolve Request</h2>
                </div>

                <div className="box">
                   <form> 

                   </form>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );


}

export default ResolveRequestForm;