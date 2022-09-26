import axios from "axios";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";


const ProjectForm = ({reload, setReload}) => {

    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const [name, setName] = useState("");

    const resetValues = () => {
        setName("");
    }

    const handleSubmit = async () => {
        setLoader(true);
        await axios.post("/server/projects", {name}).then((res)=> {
            resetValues();
            setSuccess('Project created successfully');
            
        }).catch((err)=> {
            setError(err.response.data.message);
            console.log(error);
        }).finally(()=> {
            setLoader(false);
            setReload(reload + 1 );
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
                    <h2> New project </h2>
                    <label htmlFor="name">
                    Name
                        <input
                            className="input"
                            id="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => {setName(e.target.value);}}/>
                    </label>
                    
                    
                </div>
                <button>Submit</button>
            </form>

            
        </div>
    );

}

export default ProjectForm;