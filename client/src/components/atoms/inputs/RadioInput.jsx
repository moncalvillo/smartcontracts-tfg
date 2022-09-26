

const RadioInput = (props) => {

    const {label1, label2, opt1, opt2, setState,  state, resolver} = props;
    
    const onValueChange = (e) => {
        setState(e.target.value);
    }

    const className = resolver ? "wrapper resolver" : "wrapper";

    return (
        <div className={className}>
            <input type="radio" name="role" id="firstOpt" value={opt1} checked={state === opt1}
                onChange={onValueChange}/>
            <input type="radio" name="role" id="secondOpt" value={opt2} checked={state === opt2}
                onChange={onValueChange}/>
            <label htmlFor="firstOpt" className="option firstOpt">
                
                <span>{label1}</span>
            </label>
            <label htmlFor="secondOpt" className="option secondOpt">
                
                <span>{label2}</span>
            </label>
        </div>
    );
}


export default RadioInput;