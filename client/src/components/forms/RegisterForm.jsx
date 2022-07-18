import { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useUser } from "../../hooks/useUser";

const RegisterForm = ({onRegisterRedirect}) => {

    const [loader, setLoader] = useState(true);
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const {setAccessToken} = useUser();



    useEffect(() => {
        setLoader(false);
    }, []);

    const handleSubmit = async () => {
        setLoader(true);
        axios.post("http://localhost:8080/api/server/new", {email: email, username: username, password: password}).then((res) => {
            if(res.status === 201) {
                setAccessToken(res.data.accessToken);
                document.cookie = `accessToken=${res.data.accessToken}`;
            }else{
                
            }
        }).catch((err) => {
            console.log(err.response);
            setError(err.response.data.message);
        }).finally(() => {
            setTimeout(()=>{
                setLoader(false);
            }, 1000)
        });
    };

    useEffect(()=>{
        setError(null);
    }, [password, confirmPassword, username, email]);

    useEffect(()=>{
        if(password !== confirmPassword){
            setError("Passwords do not match");
            setDisabled(true);   
        }else{
            setDisabled(false);
            setError(null);
        }
    }, [confirmPassword,password])

    return (
        <div className="formDiv">
            
            <form className="form" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}> 
                {
                    loader &&  <div className="loading"> <TailSpin color="grey" height={40}/>  </div> 
                }
                {
                    error && <div className="error"> {error} </div> 
                }
                <div className="box">
                    <h2>Register</h2>
                    <label htmlFor="email">
                    Email
                    <input required className="input" type="email" name="email" placeholder="email" onBlur={(e)=>{
                        setEmail(e.target.value);
                    }}/>
                    </label>
                    <label htmlFor="username">
                    Username
                    <input required className="input" type="text" name="username" placeholder="username" onBlur={(e)=>{
                        setUsername(e.target.value);
                    }}/>
                    </label>
                        
                    <label htmlFor="password">
                    Password
                    <input required className="input" type="password" name="password" placeholder="password" onBlur={(e)=>{
                        setPassword(e.target.value);
                    }}/>
                    </label>
                    <label htmlFor="rptPassword">
                    Repeat password
                    <input required className="input" type="password" name="rptPassword" placeholder="repeat password" onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}/>
                    </label>
                    Already have an account? <a onClick={onRegisterRedirect}>Login</a>
                </div>
                <button disabled={disabled}>
                    Register
                </button>

            </form>
        </div>
    );
}

export default RegisterForm;






