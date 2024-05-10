import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AppContext } from '../pages/Home';
// Load language translations
import { useTranslation } from 'react-i18next';
import '../config/i18n';

// Load CSS
import '../assets/styles/components/settings.scss';

export default () => {
	const [error, setError] = useState('');
	const { t }             = useTranslation(); // For translations

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// TODO: Add Code Here
	};

	return (
		<>
			<Helmet>
				<title>{t('settings.pageTitle')}</title>
				<meta name="description"
				      content="Create a new account on our site. Enter your personal information and secure your profile."/>
			</Helmet>

			<form className="form settings-form" onSubmit={handleFormSubmit}>
				<header className="form__header">
					<h2 className="form__title">{t('settings.formTitle')}</h2>
				</header>

				<div className="form__row settings-form__row--name">
					<label className="form__label form__label--name" htmlFor="name">{t('settings.name')}</label>
					<input className="form__input form__input--name" type="text" name="name" placeholder={t('settings.name')}/>
				</div>

				<div className="form__row settings-form__row--username">
					<label className="form__label form__label--username" htmlFor="username">{t('settings.username')}</label>
					<input className="form__input form__input--username" type="text" name="username"
					       placeholder={t('settings.username')}/>
				</div>

				<div className="form__row settings-form__row--email">
					<label className="form__label form__label--email" htmlFor="email">{t('settings.email')}</label>
					<input className="form__input form__input--email" type="email" name="email" placeholder={t('settings.email')}/>
				</div>

				<div className="form__row settings-form__row--password">
					<label className="form__label form__label--password" htmlFor="password">{t('settings.password')}</label>
					<input className="form__input form__input--password" type="password" name="password"
					       placeholder={t('settings.password')}/>
				</div>

				<div className="form__row settings-form__row--confirm">
					<label className="form__label form__label--confirm-password"
					       htmlFor="confirmpassword">{t('settings.passConfirm')}</label>
					<input className="form__input form__input--confirm-password" type="password" name="confirmpassword"
					       placeholder={t('settings.passConfirm')}/>
				</div>

				<div className="form__row settings-form__row--accept-terms">
					<input className="form__input form__input--checkbox" type="checkbox" name="coppa" id="coppa"/>
					<label className="form__label form__label--checkbox"
					       htmlFor="coppa">{t('settings.coppa')}</label>
				</div>

				<div className="form__row settings-form__row--accept-terms">
					<input className="form__input form__input--checkbox" type="checkbox" name="terms" id="terms"/>
					<label className="form__label form__label--checkbox"
					       htmlFor="terms">{t('settings.terms')}</label>
				</div>

				<div className="form__row settings-form__row--submit">
					<button className="form__button form__button--submit" type="submit">{t('settings.button')}</button>
				</div>

				<div className="form__message form__message--error">{error}</div>
			</form>
		</>
	);
}
