import axios from "axios";
import { useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { useUser } from "../../hooks/useUser";



const FacebookSignIn = () => {
    const {setAccessToken} = useUser();

    const handleOnClick = () => {
        window.FB.login(function(response){
            console.log(response);
          // handle the response 
          axios.get("/auth/facebook", { params: { access_token: response.authResponse.accessToken } }).then(res => {
            setAccessToken(res.data.user.accessToken);
          });

        });
      }

    return (
        <FaFacebook size={"45px"} color={"#B5B5B5"} onClick={handleOnClick}/>
    );
}

export default FacebookSignIn;