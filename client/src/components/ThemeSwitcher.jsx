// Import React and necessary modules
import React from 'react';
import { settings } from '../config/settings';
import { useTranslation } from 'react-i18next';

// Component definition
export default () => {
	// TODO: Load settings from logged in user.
	// useTranslation hook to get the translation function `t`
	const { t } = useTranslation();

	// State hooks
	const [activeTheme, setActiveTheme]     = React.useState(settings.themes.default);
	const [previousTheme, setPreviousTheme] = React.useState(null);

	// Sets the new theme as active and the previous theme as the active one
	const handleThemeChange = (theme) => {
		setPreviousTheme(activeTheme);
		setActiveTheme(theme);
		// TODO: Save settings for logged in user.
	};

	// useEffect hook to listen for changes in the active or previous theme
	// When a change is detected, it updates the theme in the body classList
	React.useEffect(() => {
		// Remove the previous theme class from body
		if (previousTheme && previousTheme !== activeTheme)
			document.body.classList.remove(`theme--${previousTheme}`);

		// Add the active theme class to body
		document.body.classList.add(`theme--${activeTheme}`);
	}, [previousTheme, activeTheme]);

	// useMemo hook to memoize the computation of theme class names
	// It will only recompute when activeTheme or t changes
	const themeClassNames = React.useMemo(() => {
		// Map each theme to an object with its key, theme, class names, and label
		return Object.entries(settings.themes.list)
		             .map(([key, theme]) => {
			             return {
				             key, theme,
				             // Generate classNames using template strings and array join
				             classNames: ['icon',
				                          'themes__icon',
				                          `themes__icon--${theme}`,
				                          activeTheme === theme ? 'active' : ''].join(' '),
				             // Get the translated label for the theme
				             label: t(`themes.aria.${theme}`)
			             };
		             });
	}, [activeTheme, t]);

	// Render the component
	return (
		<div className="themes">
			<header className="themes__header">{t('themes.title')}</header>
			{/* Map each theme to a span element with its respective class names, aria-label, and click event */}
			{themeClassNames.map(({ key, theme, classNames, label }) => (
				<span onClick={() => handleThemeChange(theme)}
				      className={classNames}
				      role="img"
				      key={key}
				      aria-label={label}>{theme}</span>
			))}
		</div>
	);
};
