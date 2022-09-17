import axios from "axios";
import { useEffect, useState } from "react";
import ProjectForm from "../forms/ProjectForm";
import TypeForm from "../forms/TypeForm";
import ListForm from "../molecules/ListForm";

const ManagerFormWrapper = () => {

    const [projects, setProjects] = useState([]);
    const [types, setTypes] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        getTypes();
        getProjects();
    } , [reload]);


    async function getTypes(){
        axios.get(`/server/types`).then((res) => {
            setTypes(res.data.result); 
        }).catch((err) => {
            console.log(err);
        })
    }
    async function getProjects(){
        axios.get(`/server/projects`).then((res) => {
            setProjects(res.data.result); 
        }).catch((err) => {
            console.log(err)
        })
    }
    
    return (

        <div> 
            <div className="list-form"> 
                <ProjectForm setReload={setReload} reload={reload}/>
                <ListForm data={projects} type="projects" setReload={setReload} reload={reload}/>  
            </div>
            <div className="list-form">
                <TypeForm setReload={setReload} reload={reload}/>
                <ListForm data={types} type="types" setReload={setReload} reload={reload}/>
            </div>
        </div>
    );


}

export default ManagerFormWrapper;