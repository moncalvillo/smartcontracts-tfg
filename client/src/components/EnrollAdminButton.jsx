import axios from "axios";
import { useState } from "react";

const EnrollAdminButton = (props) => {

    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const handleOnClick = () => {
        setLoading(true);
        axios.post("http://localhost:8080/api/enroll").then((res) => {
            if(res.status === 200) {
                setTimeout(() => {
                    setLoading(false);
                    alert(res.data.message, res.data.admin);
                }, 2000);
            }
        }).catch((err) => {
            setError(err.response.data.message);
            setLoading(false);
            console.log(err);
        });
    }
    return (
        <div className="enroll-admin-button">
            <button className="enroll-admin-button-button" onClick={handleOnClick}>
                Enroll as Admin
            </button>
        </div>
    );
}

export default EnrollAdminButton;