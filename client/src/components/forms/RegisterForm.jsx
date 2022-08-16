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
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [role, setRole] = useState("");

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const {setAccessToken} = useUser();



    useEffect(() => {
        setLoader(false);
    }, []);

    const handleSubmit = async () => {
        setLoader(true);
        axios.post("/server/new", {email, username, password, firstName: firstname, lastName: lastname, roleType: role}).then((res) => {
            if(res.status === 201) {
                setAccessToken(res.data.user.accessToken);
                // document.cookie = `accessToken=${res.data.accessToken}`;
            }
        }).catch((err) => {
            console.log(err.response);
            setError(err.response.data.message);
        }).finally(() => {
            setLoader(false);
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

    const onValueChange = (e) => {
        setRole(e.target.value);
        console.log(e.target.value);
    }

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
                    <div className="fullname">
                        <label htmlFor="firstname">
                            First name
                            <input required className="input" type="text" name="firstname" placeholder="first name" onBlur={(e)=>{
                                setFirstname(e.target.value);
                            }}/>
                        </label>
                        <label htmlFor="lastname">
                            Last name
                            <input required className="input" type="text" name="lastname" placeholder="last name" onBlur={(e)=>{
                                setLastname(e.target.value);
                            }}/>
                        </label>
                    </div>
                    <label htmlFor="role">
                    Role
                        <div className="wrapper" >
                            <input type="radio" name="role" id="user" value="user" checked={role === "user"}
              onChange={onValueChange}/>
                            <input type="radio" name="role" id="manager" value="manager" checked={role === "manager"}
              onChange={onValueChange}/>
                            <label for="user" className="option user">
                                <div class="dot"></div>
                                <span>Responsible</span>
                            </label>
                            <label for="manager" className="option manager">
                                <div class="dot"></div>
                                <span>Manager</span>
                            </label>
                        </div>
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






