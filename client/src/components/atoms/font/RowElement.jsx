

const RowElement = ({ label, value, style}) => {

    return (
        <div className="row-element">
            <p>{label}: </p><b style={style}>{value}</b>
        </div>
    );

}

export default RowElement;