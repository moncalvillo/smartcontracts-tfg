import { EthProvider } from "./contexts/EthContext";
import Footer from "./components/Footer";
import "./App.css";
import ConnectButton from "./components/ConnectButton";
import MetamaskLogo from "./components/MetamaskLogo";
import ListAccounts from "./components/ListAccounts";
import { useState } from "react";
import { useEffect } from "react";


const App = () => {

  const [loading, setLoading] = useState(true);

  const [accounts, setAccounts] = useState([""]);


  useEffect( () => {
    getAccounts();
    setLoading(false);
  },[accounts])

  const getAccounts = async () => {
    const accts = await window.ethereum.request({ method: 'eth_accounts' });
    setAccounts(accts);
    console.log(accounts);
    console.log(accounts[0])
  };


  return (
    // <EthProvider>
      <div id="App" >
        <MetamaskLogo />
        <div className="container">
          { (!accounts[0] || accounts[0] === '') ? <ConnectButton handleConnect={setAccounts} /> : <ListAccounts accounts={accounts} />}
          
          <Footer />
        </div>
      </div>
    // </EthProvider>
  );
}

export default App;
