import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { TailSpin  } from "react-loader-spinner";
import SocialMediaIcons from "../wrappers/SocialMediaIcons";

const LoginForm = ({onLoginRedirect}) => {

    const [loader, setLoader] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState(null);
    const {setUser} = useUser();

    useEffect(() => {
        setLoader(false);
    }, []);

    const handleSubmit = async () => {
        setLoader(true)
        axios.post("/server/login", {email, password}).then((res) => {
            setUser(res.data.user);
        }).catch((err) => {
            console.log(err.response);
            setMsg(err.response.data.message);
        }).finally(() => {                
            setLoader(false);
            setTimeout(()=>{
                setMsg(null);
            }, 3000);
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
                    <input required className="input" type="email" name="email" placeholder="email" onBlur={(e)=>{
                        setEmail(e.target.value);
                    }}/>
                    </label>
                        
                    <label htmlFor="password">
                    Password.
                    <input className="input" type="password" name="password" placeholder="password" onBlur={(e)=>{
                        setPassword(e.target.value);
                    }}/>
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






