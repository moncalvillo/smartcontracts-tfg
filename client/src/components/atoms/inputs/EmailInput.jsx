import { Input } from "antd";



const EmailInput = (props) => {
    
    const { placeholder, setState } = props;
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
        <Input className="input" placeholder={placeholder || "Email"} style={style} onBlur={(e)=>{
            setState(e.target.value);
        }}/>
    );
}

export default EmailInput;