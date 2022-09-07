import axios from "axios";
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
        // <FaFacebook size={"45px"}  onClick={handleOnClick}/>
        <button class="loginBtn--facebook" onClick={handleOnClick}>
          Login with Facebook
        </button>
    );
}

export default FacebookSignIn;