import { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useUser } from "../hooks/useUser";
import SocialMediaIcons from "../organism/SocialMediaIcons";
import RadioInput from "../atoms/inputs/RadioInput";
import { useTranslation } from "react-i18next";

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
                setAccessToken(res.data.user.accessToken);
                document.cookie = `accessToken=${res.data.user.accessToken}`;
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

    const {t} = useTranslation();
    
    const radioProps = {
        label1: t("Common:responsible"),
        label2: t("Common:inspector"),
        opt1: "user", 
        opt2: "manager", 
        setState: setRoleType, 
        state: roleType,
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
                    <h2>{t("Auth:register")}</h2>
                    <label htmlFor="email">
                    {t("Auth:email")}
                        <input required className="input" type="email" name="email" placeholder={t("Auth:email")} onBlur={(e)=>{
                            setEmail(e.target.value);
                        }}/>
                    </label>
                    <label htmlFor="firstName">
                    {t("Auth:firstName")}
                        <input required className="input" type="text" name="firstName" placeholder={t("Auth:firstName")} onBlur={(e)=>{
                            setFirstName(e.target.value);
                        }}/>
                    </label>
                    <label htmlFor="lastName">
                    {t("Auth:lastName")}
                        <input required className="input" type="text" name="lastName" placeholder={t("Auth:lastName")} onBlur={(e)=>{
                            setLastName(e.target.value);
                        }}/>
                    </label>
                    <label htmlFor="role">
                    {t("Auth:role")}
                        <RadioInput {...radioProps}/>
                    </label>
                    <label htmlFor="password">
                    {t("Auth:password")}
                        <input required className="input" type="password" name="password" placeholder={t("Auht:password")} onBlur={(e)=>{
                            setPassword(e.target.value);
                        }}/>
                    </label>
                    <label htmlFor="rptPassword">
                    {t("Auth:repeatPassword")}
                        <input required className="input" type="password" name="rptPassword" placeholder={t("Auth:repeatPassword")} onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}/>
                    </label>
                    {t("Auth:alreadyAccount")} <a onClick={onRegisterRedirect}>{t("Auth:login")}</a>
                </div>
                <button disabled={disabled}>
                {t("Auth:register")}
                </button>
                <div className="social-media">
                    <SocialMediaIcons />
                </div>

            </form>
        </div>
    );
}

export default RegisterForm;






