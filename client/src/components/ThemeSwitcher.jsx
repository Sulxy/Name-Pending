import React from 'react';
import { settings } from '../config/settings';
import { useTranslation } from 'react-i18next';

export default () => {
	// Use the `useTranslation` hook to access the `t` function
	const { t, i18n } = useTranslation();

	// This function is called when a language is selected from the UI
	const handleThemeChange = async (language) => {
		// Change language in the i18next instance
		// await i18n.changeLanguage(language);
		// Load the new locale after language has been changed
	};

	return (
		<div className="themes">
			<header className="themes__header">{t('themes.title')}</header>
			{/* Loop through the language map */}
			{Object.entries(settings.themes).map(([key, theme]) => (
				<span
					onClick={() => handleThemeChange(theme)}
					className={`icon themes__icon themes__icon--${theme}`}
					role="img"
					key={key}
					aria-label={t(`themes.aria.${theme}`)}>
					{theme}
                </span>
			))}
		</div>
	);
}
