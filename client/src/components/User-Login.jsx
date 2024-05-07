import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AppContext } from '../pages/Home';

// Load CSS
import '../assets/styles/sections/loginregister.scss';

export default () => {
	const { setIsLogin }          = useContext(AppContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError]       = useState('');

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// TODO: Add Code Here
	};

	return (
		<>
			<Helmet>
				<title>Login</title>
				<meta name="description"
				      content="Secure user login page for Whisper. Enter your username and password to access your account and manage your profile settings."/>
			</Helmet>

			<form className="form login-form" onSubmit={handleFormSubmit}>
				<header className="form__header">
					<h2 className="form__title">Login</h2>
					<Link className="link form__link" onClick={() => setIsLogin(false)} to="#">
						Go to Register
					</Link>
				</header>
				<div className="form__row">
					<label className="form__label form__label--username" htmlFor="username">Username</label>
					<input className="form__input form__input--username" type="text" name="username"
					       placeholder="Username"/>
				</div>
				<div className="form__row">
					<label className="form__label form__label--password" htmlFor="password">Password</label>
					<input className="form__input form__input--password" type="password" name="password"
					       placeholder="Password"/>
				</div>
				<div className="form__row login-form__row--checkbox">
					<input className="form__input form__input--checkbox" type="checkbox" name="checkbox" id="checkbox"/>
					<label className="form__label form__label--checkbox" htmlFor="checkbox">Stay logged in</label>
					<button className="form__button form__button--submit" type="submit">Login</button>
				</div>
				<div className="form__message form__message--error">{error}</div>
			</form>
		</>
	);
}
