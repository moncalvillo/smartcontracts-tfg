import { useTranslation } from 'react-i18next';
import {BsListUl} from 'react-icons/bs';

const RequestsLink = () => {
    const {t} = useTranslation();
    return (
        <div className="link">
            <BsListUl className="linkItem" size="50%"/>
            <div className="linkItem">
            {t("Common:expenses")}
            </div>
        </div>
    );
}

export default RequestsLink;