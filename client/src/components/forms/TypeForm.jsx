import axios from "axios";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";


const TypeForm = () => {

    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const [name, setName] = useState("");

    const resetValues = () => {
        setName("");
    }

    const handleSubmit = async () => {
        setLoader(true);
        await axios.post("/server/types", {name}).then((res)=> {
            resetValues();
            setSuccess('Type created successfully');
            
        }).catch((err)=> {
            setError(err.response.data.message);
            console.log(error);
        }).finally(()=> {
            setLoader(false);
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
                    <h2> New type of expense </h2>
                    <label htmlFor="concept">
                    Name
                        <input
                            className="input"
                            id="concept"
                            placeholder="Concept"
                            value={name}
                            onChange={(e) => {setName(e.target.value);}}/>
                    </label>
                    
                    
                </div>
                <button>Submit</button>
            </form>
        </div>
    );

}

export default TypeForm;