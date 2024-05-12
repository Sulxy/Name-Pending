import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { settings } from './settings';

// Initialize i18n instance and link to Backend and React
export default i18n
	.use(Backend)           // Load translations on demand from the HTTP backend
	.use(initReactI18next)  // Provide hooks to connect to React components
	.init({
		      lng: settings.locale.default,             // Set default language
		      fallbackLng: settings.locale.default,     // Fallback if any are missing
		      interpolation: {
				  escapeValue: false    // React escapes by default
		      },
		      returnObjects: true,      // Return objects from translation files
		      initImmediate: false,     // Load resources synchronously
		      backend: {
				  loadPath: '/locales/{{lng}}.json'     // Path in /public to load from
			  }
	      });
