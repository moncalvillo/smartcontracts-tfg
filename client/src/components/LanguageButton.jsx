import { useTranslation } from "react-i18next";


const LanguageButton = () => {

    const {i18n} = useTranslation();
  
    const changeLanguage = (lng) => {
        i18n.language === "es" ? i18n.changeLanguage("en") : i18n.changeLanguage("es");
    };

    return (
        
                <div className="button r" id="button-1">
                    <input type="checkbox" className="checkbox" onClick={changeLanguage}/>
                    <div className="knobs"></div>
                    <div className="layer"></div>
                </div>
    );


}

export default LanguageButton;