import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Selector from "../../atoms/inputs/Select";

const ProjectFilter = ({setProject, setError}) => {
    
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    } , []);

    async function getProjects(){
        axios.get(`/server/projects`).then((res) => {
            setProjects(res.data.result); 
        }).catch((err) => {
            setError(err)
        })
    }

    const {t} = useTranslation();

    return (
        <Selector label={t("Expense:project")} setState={setProject} options={projects}/>
    );
}

export default ProjectFilter;