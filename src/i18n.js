import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import polish from './locales/pl.json';
import english from './locales/en.json';

const resources = {
    en: {
        translation: english
    },
    pl: {
        translation: polish
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "pl",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;