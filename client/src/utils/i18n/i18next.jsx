import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { es, en } from "./lang";

export const defaultNS = false;
export const resources = {
  en,
  es,
};

i18next
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    ns: Object.keys(es),
    defaultNS,
    resources,
  });
