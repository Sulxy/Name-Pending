import React from 'react';
import { settings } from '../config/settings';
import { useTranslation } from 'react-i18next';

export default () => {
	// Use the `useTranslation` hook to access the `t` function
	const { t, i18n }                   = useTranslation();
	const [activeTheme, setActiveTheme] = React.useState(settings.themes.default);

	// This function is called when a theme is selected from the UI
	const handleThemeChange = async (theme) => {
		setActiveTheme(theme);
	};

	React.useEffect(() => {
		document.body.classList.remove(`theme--${activeTheme}`);
		document.body.classList.add(`theme--${activeTheme}`);
	}, [activeTheme]);

	return (
		<div className="themes">
			<header className="themes__header">{t('themes.title')}</header>
			{/* Loop through the language map */}
			{Object.entries(settings.themes.list).map(([key, theme]) => (
				<span
					onClick={() => handleThemeChange(theme)}
					className={[
						'icon',
						'themes__icon',
						`themes__icon--${theme}`,
						activeTheme === theme ? 'active' : ''
					].join(' ')}
					role="img"
					key={key}
					aria-label={t(`themes.aria.${theme}`)}>
					{theme}
                </span>
			))}
		</div>
	);
}
