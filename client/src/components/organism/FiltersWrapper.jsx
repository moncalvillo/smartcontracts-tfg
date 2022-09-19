import ProjectFilter from "../molecules/filters/ProjectFilter";
import StateFilter from "../molecules/filters/StateFilter";
import TypeFilter from "../molecules/filters/TypeFilter";
import UserFilter from "../molecules/filters/UserFilter";
import {useUser} from "../hooks/useUser";

const FiltersWrapper = ({setProject, setError, setType, setRequestState, setUser, oracle}) => {


    const {user} = useUser();
    return (
        <div className="filters"> 
            <h1> Filters </h1>
            <ProjectFilter setProject={setProject} setError={setError}/>
            <br/>
            <TypeFilter setType={setType} setError={setError}/>
            { !oracle && <> <br/>
             <StateFilter setRequestState={setRequestState} /> </>}
            { user.roleType !== "user" && <> <br/>
             <UserFilter setUser={setUser} setError={setError}/> </> }
        </div>
    );


}

export default FiltersWrapper;