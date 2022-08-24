import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { TailSpin  } from "react-loader-spinner";
import SocialMediaIcons from "../wrappers/SocialMediaIcons";
import PasswordInput from "../atoms/inputs/PasswordInput";
import EmailInput from "../atoms/inputs/EmailInput";

const LoginForm = ({onLoginRedirect}) => {

    const [loader, setLoader] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState(null);
    const {setAccessToken} = useUser();

    useEffect(() => {
        setLoader(false);
    }, []);

    const handleSubmit = async () => {
        setLoader(true)
        axios.post("/server/login", {email, password}).then((res) => {
            setAccessToken(res.data.user.accessToken);
        }).catch((err) => {
            console.log(err.response);
            setMsg(err.response.data.message);
        }).finally(() => {                
            setLoader(false);
        });
        
    };

    useEffect(()=>{
        setMsg(null);
    }, [password, email]);

    return (
        <div className="formDiv">
            <form className="form" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}> 
                
                {
                    loader && <div className="loading"> <TailSpin color="grey" height={40}/>  </div> 
                } 
                {
                    msg  && <div className="error"> {msg} </div>
                }
                <div className="box">
                    <h2>Login</h2>
                    <label htmlFor="email">
                    Email
                    <EmailInput placeholder="Email" setState={setEmail} />
                    </label>
                        
                    <label htmlFor="password">
                    Password
                    <PasswordInput placeholder="Password" setState={setPassword}/>
                    </label>

                    Don`t have an account? <a onClick={onLoginRedirect}>Register</a>
                </div>
                <button>
                    Login
                </button>

            </form>
            <div className="social-media">
                <SocialMediaIcons />
            </div>
        </div>
    );
}

export default LoginForm;






