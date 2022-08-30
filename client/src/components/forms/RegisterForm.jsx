import { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useUser } from "../hooks/useUser";
import SocialMediaIcons from "../organism/SocialMediaIcons";

const RegisterForm = ({onRegisterRedirect}) => {

    const [loader, setLoader] = useState(true);
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [roleType, setRoleType] = useState("");

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const {setAccessToken} = useUser();



    useEffect(() => {
        setLoader(false);
    }, []);

    const handleSubmit = async () => {
        setLoader(true);
        axios.post("/server/new", {email, firstName, password, lastName,roleType}).then((res) => {
            if(res.status === 201) {
                console.log(res.data)
                setAccessToken(res.data.user);
                document.cookie = `accessToken=${res.data.accessToken}`;
            }
        }).catch((err) => {
            setError(err.response.data.message);
        }).finally(() => {
            setLoader(false);
        });
    };

    useEffect(()=>{
        setError(null);
    }, [password, confirmPassword, firstName, lastName, email]);

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
        setRoleType(e.target.value);
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
                    <label htmlFor="firstName">
                        First name
                        <input required className="input" type="text" name="firstName" placeholder="first name" onBlur={(e)=>{
                            setFirstName(e.target.value);
                        }}/>
                    </label>
                    <label htmlFor="lastName">
                        Last name
                        <input required className="input" type="text" name="lastName" placeholder="last name" onBlur={(e)=>{
                            setLastName(e.target.value);
                        }}/>
                    </label>
                    <label htmlFor="role">
                    Role
                        <div className="wrapper" >
                            <input type="radio" name="role" id="user" value="user" checked={roleType === "user"}
                                onChange={onValueChange}/>
                            <input type="radio" name="role" id="manager" value="manager" checked={roleType === "manager"}
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
                <div className="social-media">
                    <SocialMediaIcons />
                </div>

            </form>
        </div>
    );
}

export default RegisterForm;






