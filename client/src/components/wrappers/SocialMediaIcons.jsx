import { AiFillGoogleCircle, AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { useEffect  } from "react";
import { useUser } from "../../hooks/useUser";
import axios from "axios";
import GoogleSignIn from "../icons/GoogleSignIn";

const SocialMediaIcons = () => {
    


    
    return (
        <div className="social-media-icons">
            <GoogleSignIn />
            {/* <AiFillGoogleCircle size={"48px"} onClick={googleSigIn} />  */}
            
            <FaFacebook size={"45px"} color={"#B5B5B5"}/>
            <AiFillTwitterCircle size={"48px"} color={"#B5B5B5"}/>
        </div>
    );

}

export default SocialMediaIcons;