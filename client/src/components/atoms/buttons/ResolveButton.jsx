import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


const ResolveButton = ({ id }) => {

    const path = `/expenses/${id}`;
    const {t} = useTranslation();
    return(
        <Link to={path}>
            <button className="requestButton">
            {t("Common:goRequest")}
            </button>
        </Link>
    );

}

export default ResolveButton;