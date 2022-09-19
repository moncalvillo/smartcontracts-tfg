

const RowElement = ({ label, value}) => {

    return (
        <div className="row-element">
            <p>{label}: </p><b>{value}</b>
        </div>
    );

}

export default RowElement;