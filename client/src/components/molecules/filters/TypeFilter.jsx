import axios from "axios";
import { useEffect, useState } from "react";
import Selector from "../../atoms/inputs/Select";


const TypeFilter = ({setType, setError}) => {

    const [types, setTypes] = useState([]);

    async function getTypes(){
        axios.get(`/server/types`).then((res) => {
            setTypes(res.data.result); 
        }).catch((err) => {
            setError(err)
        })
    }

    useEffect(() => {
        getTypes();
    } , []);

    return (
        <Selector label="Type" setState={setType} options={types}/>
    );

}

export default TypeFilter;