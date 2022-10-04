import { useTranslation } from "react-i18next";
import { useUser } from "./hooks/useUser";
import LanguageButton from "./LanguageButton";

const ProfileName = () => {

    const { user } = useUser();
    const {t } = useTranslation();
    return (
        <div className="profile-name">
            <h2>{user.username}</h2>
            {t("Auth:fullName")}: <h3> {user.firstName} {user.lastName}</h3>
            {t("Auth:email")}: <h3> {user.email}</h3>
            {t("Auth:wallet")}: <h3> {user.wallet}</h3>
            {t("Auth:role")}: <h3> {user.roleType}</h3>
            <LanguageButton />
        </div>
    );
}

export default ProfileName;