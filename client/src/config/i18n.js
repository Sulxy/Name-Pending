import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { settings } from './settings';

// Initialize i18n instance and set default language to English.
export default i18n
	.use(Backend)
	.use(initReactI18next)
	.init({
		      lng:           settings.locale.default,
		      fallbackLng:   settings.locale.default,
		      interpolation: {
			      escapeValue: false
		      },
		      returnObjects: true,
		      initImmediate: false,
		      backend:       {
			      loadPath: `/locales/{{lng}}.json`
		      }
	      });
