

const RadioInput = ({ opt1, opt2, setState,  state }) => {


    const onValueChange = (e) => {
        setState(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div className="wrapper" >
            <input type="radio" name="role" id="firstOpt" value={opt1} checked={state === opt1}
                onChange={onValueChange}/>
            <input type="radio" name="role" id="secondOpt" value={opt2} checked={state === opt2}
                onChange={onValueChange}/>
            <label for="firstOpt" className="option firstOpt">
                <div class="dot"></div>
                <span>{opt1}</span>
            </label>
            <label for="secondOpt" className="option secondOpt">
                <div class="dot"></div>
                <span>{opt2}</span>
            </label>
        </div>
    );
}


export default RadioInput;