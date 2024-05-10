import React, { useContext, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AppContext } from '../pages/Home';
// Load language translations
import { useTranslation } from 'react-i18next';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/queries';
import '../config/i18n';

// Load CSS
import '../assets/styles/sections/loginregister.scss';

export default function LoginPage(){
	const { setIsLogin } = useContext(AppContext);
	const [formState, setFormState] = useState({ username: '', password: '' });
	const [err, setError] = useState('');
	const [login, { error, data }] = useLazyQuery(LOGIN_USER);
	const { t } = useTranslation(); // For translations
	const handleChange = (event) => {
		const { name, value } = event.target;
	
		setFormState({
		  ...formState,
		  [name]: value,
		});
	  };
	// console.log(login(), data);
	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState)
		try {
			const { data } = await login({
			  variables: { ...formState },
			});
			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}
		// clear form values
		setFormState({
			username: '',
			password: '',
		  });
	};
	
	return (
		<>
			<Helmet>
				<title>{t('login.page.title')}</title>
				<meta name="description"
				      content={t('login.page.description')}/>
			</Helmet>

			<form className="form login-form" onSubmit={handleFormSubmit}>
				<header className="form__header">
					<h2 className="form__title">{t('login.formTitle')}</h2>
					<Link className="link form__link" onClick={() => setIsLogin(false)}
					      to="#">{t('login.linkText')}</Link>
				</header>
				<div className="form__row">
					<label className="form__label form__label--username"
					       htmlFor="username">{t('login.username')}</label>
					<input className="form__input form__input--username" type="username" name="username" value={formState.username} onChange={handleChange}
					       placeholder={t('login.username')}/>
				</div>
				<div className="form__row">
					<label className="form__label form__label--password"
					       htmlFor="password">{t('login.password')}</label>
					<input className="form__input form__input--password" type="password" name="password" value={formState.password} onChange={handleChange}
					       placeholder={t('login.password')}/>
				</div>
				<div className="form__row login-form__row--checkbox">
					<input className="form__input form__input--checkbox" type="checkbox" name="checkbox" id="checkbox"/>
					<label className="form__label form__label--checkbox"
					       htmlFor="checkbox">{t('login.checkbox')}</label>
					<button className="form__button form__button--submit" type="submit">{t('login.button')}</button>
				</div>
				{/* <div className="form__message form__message--error">{err}</div> */}
			</form>
		</>
	);
}
