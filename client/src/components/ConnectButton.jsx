import { Button } from "antd";
import { useState } from "react";

const ConnectButton = () => {

    const [account,setAccount] = useState("");

    
    const connect = () => {
        const acc =  window.ethereum.request({ method: "eth_requestAccounts" })
        .catch((err) => {
            if (err.code === 4001) {
            console.log("Please connect to MetaMask.");
            } else {
            console.error(err);
            }
        });
        setAccount(acc);

    };

    const style = {
        margin: "5%",
        width: "90%",
        backgroundColor: "#2D7868",
    };

    return (
        <Button id="connectButton" type="primary" style={style} block onClick={connect}>
        Connect
        
        {account}
        </Button>
    );
}

export default ConnectButton;