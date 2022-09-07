import { Input } from "antd";
import { AiFillLock } from "react-icons/ai";


const PasswordInput = (props) => {

    const style = {
        width: "100%",
        height: "40px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "0 10px",
        fontSize: "16px",
        color:"#333",
        outline: "none",
    }
    return (
        <Input.Password className="input" name="password" placeholder={props.placeholder || "Password"} style={style} onBlur={(e)=>{
            props.setState(e.target.value);
        }}/>
    );

}
export default PasswordInput;