
import { useTranslation } from 'react-i18next';
import {FaWpforms} from 'react-icons/fa';

const FormLink = () => {
    const {t} = useTranslation();
    return (
        <div className="link">

            <FaWpforms className="linkItem" size="50%"/>
            <div className="linkItem">
            {t("Common:form")}
            </div>
        </div>

    );


}

export default FormLink;