import axios from "axios";
import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";



const GoogleSignIn = () => {
    const {setUser} = useUser();
    function handleCallbackResponse(response) {
        axios.post('/auth/google', { token: response.credential }).then(res => {
            console.log(res.data);
            setUser(res.data.user);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
        });
    }

    useEffect(()=>{
        /*global google*/
        google.accounts.id.initialize({
                client_id:"823602647375-d2gagrik6nqgjbcvt45joos9cf8jbpmo.apps.googleusercontent.com",
                callback:handleCallbackResponse
        });
        google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                {theme:"outline",size:"large"}
        );
    },[]);

    return (
        <div> 
            <div id="signInDiv"></div>
        </div>
    );
}

export default GoogleSignIn;