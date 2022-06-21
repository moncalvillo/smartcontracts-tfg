

const ListAccounts = ({accounts}) => {


    const divStyle = {
        display:"inline-block",
        // border: "1px solid black",
        width: "100%",
        textAlign: "center",
    }

    const ulStyle = {
    }

    const h2Style = {
    }

    const liStyle = {
        backgroundColor:"white",
        width: "100%",
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem"
    }


    return (
        <div style={divStyle} className="div-accs"> 
            <h2 style={h2Style}>
                Accounts:
            </h2>
            <div className="list-accs">
                { accounts.map( (acc) =>  (<div style={liStyle} clasName="acc-item"> {acc} </div>) ) }
            </div>
        </div>
    );
}

export default ListAccounts;