import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";


const Request = () => {

    const {id} = useParams();
    const [loader, setLoader] = useState(true);
    const [expense, setExpense] = useState(null);

    useEffect(() => {
        setLoader(true);
        getExpense();
    } , []);

    const getExpense = async () => {
        axios.get(`/fabric/expense/${id}`).then((res)=> {
            console.log(res);
            setExpense(res.data.expense);
        }).catch((err)=> {
            setExpense({
                title: "Title",
                description: "description",
                amount: "12000",
                date: "2020-01-01",
                status: "Pending",
            });
            console.log(err);
        }).finally(()=> {
            setLoader(false);
        } );
    }

    if(!expense || loader) {
        return <LoadingPage />
    }else{
        return (
            <div className="request-div">
                <div className="requestData">
                    <div className="box">
                        <h2>Resolve Request</h2>
                    </div>
                </div> 
            </div>
        );
    }

}

export default Request;


