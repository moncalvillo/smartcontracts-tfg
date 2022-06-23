import truffle from '../media/truffle.png';
import react from '../media/react.png';
import solidity from '../media/solidity.png';
import hyperledgerFabric from '../media/hyperledgerFabric.png';

function Link({ uri, text, imgSrc }) {
  return <a href={uri} target="_blank" rel="noreferrer"><li className="list-inline-item"> <img alt={text} src={imgSrc} height="40px"/></li></a>;
}

const Footer = () => {
return (
	<div className="footer-basic">
      <footer>
        <ul className="list-inline">
          <Link  uri={"https://trufflesuite.com"} text={"Truffle"} imgSrc={truffle}/> 
          <Link  uri={"https://reactjs.org"} text={"React"} imgSrc={react}/>
          <Link uri={"https://soliditylang.org"} text={"Solidity"} imgSrc={solidity}/>
          <Link uri={"https://hyperledger.org"} text={"Hyperledger Fabric"} imgSrc={hyperledgerFabric}/>
        </ul>
        <img href="./../media/hyperledgerFabric.png"/>
      </footer >
    </div>
);
};
export default Footer;





   