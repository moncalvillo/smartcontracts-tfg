import axios from "axios";
import { useEffect, useState } from "react";
import Selector from "../../atoms/inputs/Select";

const ProjectFilter = (setProject, setError) => {
    
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

    return (
        <Selector label="Project" setState={setProject} options={projects}/>
    );
}

export default ProjectFilter;