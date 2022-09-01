import axios from "axios";
import { useEffect, useState } from "react";
import Selector from "../../atoms/inputs/Select";

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

    return (
        <Selector label="User" setState={setUser} options={users}/>
    );
}

export default UserFilter;