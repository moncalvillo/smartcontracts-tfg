
import Selector from "../../atoms/inputs/Select";

const StateFilter = (setRequestState) => {

    const states = [
        {
            id: '1',
            name: 'APPROVED',
        },
        {
            id: '2',
            name: 'REJECTED',
        },
        {
            id: '3',
            name: 'PENDING',
        },
    ];

    return (
        <Selector label="State" setState={setRequestState} options={states}/>
    );

}

export default StateFilter;