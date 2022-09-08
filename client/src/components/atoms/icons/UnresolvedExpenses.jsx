import axios from "axios";
import { useEffect, useState } from "react";



const UnresolvedExpenses = () => {

    const [count, setCount] = useState(0);

    useEffect(() => { countPendings() }, []);

    const countPendings = () => {
        axios.get("http://localhost:8081/oracle/count").then((res)=>{
            setCount(res.data.result);
        }).catch((err) => {
            console.log(err);
        });
    }

    if(count !== 0) {
        return (
            <div className="unresolvedExpenses">
                {count} 
            </div>
        );
    }else {
        return null;
    }
}

export default UnresolvedExpenses;