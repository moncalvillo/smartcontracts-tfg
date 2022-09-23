
import { useTranslation } from "react-i18next";
import Selector from "../../atoms/inputs/Select";

const StateFilter = ({setRequestState}) => {

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

    const {t} = useTranslation();

    return (
        <Selector label={t("Expense:state")} setState={setRequestState} options={states}/>
    );

}

export default StateFilter;