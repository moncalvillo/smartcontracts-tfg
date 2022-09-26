import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { TailSpin  } from "react-loader-spinner";
import PasswordInput from "../atoms/inputs/PasswordInput";
import EmailInput from "../atoms/inputs/EmailInput";
import SocialMediaIcons from "../organism/SocialMediaIcons";
import { useTranslation } from "react-i18next";

const LoginForm = ({onLoginRedirect}) => {

    const [loader, setLoader] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState(null);
    const {setAccessToken} = useUser();
    const {t} = useTranslation();

    useEffect(() => {
        setLoader(false);
    }, []);

    const handleSubmit = async () => {
        setLoader(true)
        axios.post("/server/login", {email, password}).then((res) => {
            setAccessToken(res.data.user.accessToken);
        }).catch((err) => {
            console.log(err.response.data.message);
            setMsg(err.response.data.message || t("Common:error"));
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
                    <h2>{t("Auth:login")}</h2>
                    <label htmlFor="email">
                    {t("Auth:email")}
                    <EmailInput placeholder="Email" setState={setEmail} />
                    </label>
                        
                    <label htmlFor="password">
                    {t("Auth:password")}
                    <PasswordInput placeholder="Password" setState={setPassword}/>
                    </label>

                    {t("Auth:noAccount")} <a onClick={onLoginRedirect}>{t("Auth:register")}</a>
                </div>
                <button>
                {t("Auth:login")}
                </button>

            </form>
            <div className="social-media">
                <SocialMediaIcons />
            </div>
        </div>
    );
}

export default LoginForm;






