import {GiBrain} from 'react-icons/gi';
import UnresolvedExpenses from '../../atoms/icons/UnresolvedExpenses';

const OracleLink = () => {

    return (
        <div className="link">
            <UnresolvedExpenses />
            <GiBrain className="linkItem" size="50%"/>
            <div className="linkItem">
                Oracle
            </div>
        </div>

    );


}

export default OracleLink;