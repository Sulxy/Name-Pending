import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AppContext } from '../pages/Home';
// Load language translations
import { useTranslation } from 'react-i18next';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';
import '../config/i18n';

// Load CSS
import '../assets/styles/sections/loginregister.scss';

export default () => {
	const { setIsLogin }          = useContext(AppContext);
	const { t }                   = useTranslation(); // For translations
	const [error, setError]       = useState('');

	const [login, { errored, data }] = useMutation(LOGIN_USER);

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
		const { data } = await login({
			variables: { input: event },
		});

		Auth.login(data.login.token);
		} catch (e) {
		console.error(e);
		}
	};

	return (
		<>
			<Helmet>
				<title>{t('login.page.title')}</title>
				<meta name="description"
				      content={t('login.page.description')}/>
			</Helmet>

			<form className="form login-form" onSubmit={(e) => handleFormSubmit(e)}>
				<header className="form__header">
					<h2 className="form__title">{t('login.formTitle')}</h2>
					<Link className="link form__link" onClick={() => setIsLogin(false)}
					      to="#">{t('login.linkText')}</Link>
				</header>
				<div className="form__row">
					<label className="form__label form__label--username"
					       htmlFor="username">{t('login.username')}</label>
					<input className="form__input form__input--username" type="text" name="username"
					       placeholder={t('login.username')}/>
				</div>
				<div className="form__row">
					<label className="form__label form__label--password"
					       htmlFor="password">{t('login.password')}</label>
					<input className="form__input form__input--password" type="password" name="password"
					       placeholder={t('login.password')}/>
				</div>
				<div className="form__row login-form__row--checkbox">
					<input className="form__input form__input--checkbox" type="checkbox" name="checkbox" id="checkbox"/>
					<label className="form__label form__label--checkbox"
					       htmlFor="checkbox">{t('login.checkbox')}</label>
					<button className="form__button form__button--submit" type="submit">{t('login.button')}</button>
				</div>
				<div className="form__message form__message--error">{error}</div>
			</form>
		</>
	);
}
