import { useTranslation } from "react-i18next";


const LanguageButton = () => {

    const {i18n} = useTranslation();
  
    const changeLanguage = (lng) => {
        i18n.language === "es" ? i18n.changeLanguage("en") : i18n.changeLanguage("es");
    };

    return (
        
                <div class="button r" id="button-1">
                    <input type="checkbox" class="checkbox" onClick={changeLanguage}/>
                    <div class="knobs"></div>
                    <div class="layer"></div>
                </div>
    );


}

export default LanguageButton;