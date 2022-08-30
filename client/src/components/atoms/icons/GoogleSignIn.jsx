import axios from "axios";
import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";



const GoogleSignIn = () => {
    const {setAccessToken} = useUser();
    function handleCallbackResponse(response) {
        console.log("RESPONSE: ", response)
        axios.post("/auth/google", {
            token: response.credential
        }).then(res => {
            setAccessToken(res.data.user.accessToken);
          }).catch((err) => {
            console.log(err.response);
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