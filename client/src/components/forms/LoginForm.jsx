import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { TailSpin  } from "react-loader-spinner";

const LoginForm = ({onLoginRedirect}) => {

    const [loader, setLoader] = useState(true);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState(null);
    const {setAccessToken} = useUser();

    useEffect(() => {
        setLoader(false);
    }, []);

    const handleSubmit = async () => {
        setLoader(true)
        axios.post("http://localhost:8080/api/users/login", {username, password}).then((res) => {
            console.log(res.data.accessToken);
            setAccessToken(res.data.accessToken);
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
    }, [password, username]);

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
                    <label htmlFor="username">
                    Username
                    <input className="input" type="text" name="username" placeholder="username" onBlur={(e)=>{
                        setUsername(e.target.value);
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
        </div>
    );
}

export default LoginForm;






