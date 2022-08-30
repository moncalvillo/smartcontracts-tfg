
import { TailSpin  } from "react-loader-spinner";

const LoadingPage = () => {

    const style = {
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }

    return (
        <div className="loading-page" style={style}>
            <TailSpin color="grey" height={40}/>
        </div>
    );
}

export default LoadingPage;