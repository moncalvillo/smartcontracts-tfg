
import FacebookSignIn from "../atoms/icons/FacebookSignIn";
import GoogleSignIn from "../atoms/icons/GoogleSignIn";

const SocialMediaIcons = () => {
    


    
    return (
        <div className="social-media-icons">
            <GoogleSignIn />
            {/* <AiFillGoogleCircle size={"48px"} onClick={googleSigIn} />  */}
            
            <FacebookSignIn />
        </div>
    );

}

export default SocialMediaIcons;