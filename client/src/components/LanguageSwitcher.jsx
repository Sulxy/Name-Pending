// Importing React and necessary dependencies
import React from 'react';
import { settings } from '../config/settings';
import { useTranslation } from 'react-i18next';

// Component declaration
export default () => {
	// TODO: Load settings from logged in user.
	// Using the `useTranslation` hook from `react-i18next` to access the translation function `t` and the i18n instance
	const [activeLanguage, setActiveLanguage] = React.useState(settings.locale.default);
	const [showAll, setShowAll]               = React.useState(false);

	const { t, i18n } = useTranslation();

	// This will change the language in i18n instance, update our state with new active language, and toggle .show class
	const handleLanguageChange = async (language) => {
		if (activeLanguage !== language) {
			// Toggle .show flag off
			setShowAll(false);

			await i18n.changeLanguage(language);
			setActiveLanguage(language);
			// TODO: Save settings for logged in user.
		} else setShowAll(!showAll);
	};

	// useMemo will only recompute the memoized value when one of the dependencies has changed.
	const classNames = React.useMemo(() => {
		return Object.entries(settings.locale.list).map(([key, flag]) => {
			return {
				key, flag,
				// Generate classNames using template strings and array join
				classNames: ['languages__flag',
				             `languages__flag--${flag}`,
				             showAll ? 'show' : '',
				             activeLanguage === flag ? 'active' : ''].join(' '),
				// Get the translated label for the flag
				label: t(`languages.aria.${flag}`)
			};
		});
	}, [activeLanguage, showAll, t]);

	console.log(showAll);
	// Render the component
	return (
		<div className="languages">
			<header className="languages__header">{t('languages.title')}</header>
			{/* Loop through the memoized `flags` array, and for each flag, create a span element with the flag's key, className, and label */}
			{classNames.map(({ key, flag, classNames, label }) => (
				<span
					onClick={() => handleLanguageChange(flag)}
					className={classNames}
					role="img"
					key={key}
					aria-label={label}></span>
			))}
		</div>
	);
}
