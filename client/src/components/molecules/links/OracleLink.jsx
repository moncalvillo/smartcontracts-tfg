import { useTranslation } from 'react-i18next';
import {GiBrain} from 'react-icons/gi';
import UnresolvedExpenses from '../../atoms/icons/UnresolvedExpenses';

const OracleLink = () => {
    const {t} = useTranslation();
    return (
        <div className="link">
            <UnresolvedExpenses />
            <GiBrain className="linkItem" size="50%"/>
            <div className="linkItem">
            {t("Common:oracle")}
            </div>
        </div>

    );


}

export default OracleLink;