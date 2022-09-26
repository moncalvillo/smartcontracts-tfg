import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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

    const {t} = useTranslation();

    return (
        <Selector label={t("Expense:type")} setState={setType} options={types}/>
    );

}

export default TypeFilter;