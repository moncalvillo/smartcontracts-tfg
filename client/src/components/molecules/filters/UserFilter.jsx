import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const UserFilter = ({setUser, setError}) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    } , []);
    
    async function getUsers(){
        axios.get(`/server/users`).then((res) => {
            setUsers(res.data.result); 
        }).catch((err) => {
            setError(err)
        })
    }
    const {t} = useTranslation();
    return (
        <label htmlFor="selector">
            <h3>{t("Common:user")}</h3>
                <select
                    className="select"
                    id="selector"
                    onChange={(e) => setUser(e.target.value)}>
                    <option key="all" value=""> {t("Common:all")} </option>
                    {users.map((option) => {
                        
                        const opt = JSON.stringify(option);
                        return (
                        <option key={option.id} value={opt}>
                            {option.firstName} {option.lastName}
                        </option>
                        );
                    })}
                </select>
        </label>
    );
}

export default UserFilter;