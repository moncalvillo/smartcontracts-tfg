import axios from "axios";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/useUser";



const FacebookSignIn = () => {
    const {setAccessToken} = useUser();
  const {t} = useTranslation();
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
        <button className="loginBtn--facebook" onClick={handleOnClick}>
          {t("Auth:loginFacebook")}
        </button>
    );
}

export default FacebookSignIn;