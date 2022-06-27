import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { TailSpin  } from "react-loader-spinner";

const LoginForm = ({onLoginRedirect}) => {

    const [loader, setLoader] = useState(true);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {setAccessToken} = useUser();

    useEffect(() => {
        setLoader(false);
    }, []);

    const handleSubmit = async () => {
        setLoader(true)
        const accessToken = await axios.post("http://localhost:8080/api/users/login", {username: username, password: password}).then((res) => {
            if(res.status === 200) {
                console.log(res.data.accessToken)
                setAccessToken(res.data.accessToken);
            }
        }).catch((err) => {
            console.log(err);
        });
        
        setLoader(false);
    };

    return (
        <div className="formDiv">
            <form className="form" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}> 
                {
                    loader ?  <div className="loading"> <TailSpin color="grey" height={40}/>  </div> : null
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

            { localStorage.getItem("accessToken") ? <div>You are logged in</div> : null }
        </div>
    );
}

export default LoginForm;






