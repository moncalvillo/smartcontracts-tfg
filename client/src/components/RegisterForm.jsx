import { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const RegisterForm = ({onRegisterRedirect}) => {

    const [loader, setLoader] = useState(true);
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");


    useEffect(() => {
        setLoader(false);
    }, []);

    const handleSubmit = async () => {
        setLoader(true);
        await axios.post("http://localhost:8080/api/users/new", {email: email, username: username, password: password}).then((res) => {
            if(res.status === 200) {
                console.log(res);
            }
        }).catch((err) => {
            console.log(err);
        });
        setLoader(false);
    };


    const checkPasswords = () => {
        if(password !== confirmPassword) {

        }
    }

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
                        checkPasswords();
                    }}/>
                    </label>
                    Already have an account? <a onClick={onRegisterRedirect}>Login</a>
                </div>
                <button>
                    Register
                </button>

            </form>
        </div>
    );
}

export default RegisterForm;






