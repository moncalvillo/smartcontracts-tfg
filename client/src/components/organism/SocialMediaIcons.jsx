import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import FacebookSignIn from "../atoms/icons/FacebookSignIn";
import GoogleSignIn from "../atoms/icons/GoogleSignIn";

const SocialMediaIcons = () => {
    


    
    return (
        <div className="social-media-icons">
            <GoogleSignIn />
            {/* <AiFillGoogleCircle size={"48px"} onClick={googleSigIn} />  */}
            
            <FacebookSignIn />
            <AiFillTwitterCircle size={"48px"} color={"#B5B5B5"}/>
        </div>
    );

}

export default SocialMediaIcons;