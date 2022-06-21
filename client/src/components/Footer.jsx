function Link({ uri, text }) {
  return <a href={uri} target="_blank" rel="noreferrer"><li className="list-inline-item"> {text} </li></a>;
}

const Footer = () => {
return (
	<div className="footer-basic">
      <footer>
        <ul className="list-inline">
          <Link  uri={"https://trufflesuite.com"} text={"Truffle"} /> 
          <Link  uri={"https://reactjs.org"} text={"React"} />
          <Link uri={"https://soliditylang.org"} text={"Solidity"} />
          <Link uri={"https://ethereum.org"} text={"Ethereum"} />
        </ul>
      </footer >
    </div>
);
};
export default Footer;





   