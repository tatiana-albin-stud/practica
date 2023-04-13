import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation from 'translations';

const initialLang = localStorage.getItem('preferredLang') || 'en';

i18n.use(initReactI18next).init({
    resources: {
        ro: { translation },
    },
    lng: initialLang,
    fallbackLng: 'en',
    //   debug: process.env.NODE_ENV === "development",
    debug: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
