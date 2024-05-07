import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AppContext } from '../pages/Home';

// Load CSS
import '../assets/styles/sections/loginregister.scss';

export default () => {
	const { setIsLogin }          = useContext(AppContext);
	const [error, setError]       = useState('');

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// TODO: Add Code Here
	};

	return (
		<>
			<Helmet>
				<title>Register</title>
				<meta name="description"
				      content="Create a new account on our site. Enter your personal information and secure your profile."/>
			</Helmet>

			<form className="form register-form" onSubmit={handleFormSubmit}>
				<header className="form__header">
					<h2 className="form__title">Register</h2>
					<Link className="link form__link" onClick={() => setIsLogin(true)} to="#">
						Go to Login
					</Link>
				</header>

				<div className="form__row register-form__row--name">
					<label className="form__label form__label--name" htmlFor="name">Name</label>
					<input className="form__input form__input--name" type="text" name="name" placeholder="Full Name"/>
				</div>

				<div className="form__row register-form__row--username">
					<label className="form__label form__label--username" htmlFor="username">Username</label>
					<input className="form__input form__input--username" type="text" name="username"
					       placeholder="Username"/>
				</div>

				<div className="form__row register-form__row--email">
					<label className="form__label form__label--email" htmlFor="email">Email</label>
					<input className="form__input form__input--email" type="email" name="email" placeholder="Email"/>
				</div>

				<div className="form__row register-form__row--password">
					<label className="form__label form__label--password" htmlFor="password">Password</label>
					<input className="form__input form__input--password" type="password" name="password"
					       placeholder="Password"/>
				</div>

				<div className="form__row register-form__row--confirm">
					<label className="form__label form__label--confirm-password"
					       htmlFor="confirmpassword">Confirm</label>
					<input className="form__input form__input--confirm-password" type="password" name="confirmpassword"
					       placeholder="Confirm Password"/>
				</div>

				<div className="form__row register-form__row--accept-terms">
					<input className="form__input form__input--checkbox" type="checkbox" name="coppa" id="coppa"/>
					<label className="form__label form__label--checkbox"
					       htmlFor="coppa">I agree that I am at least 13 years old</label>
				</div>

				<div className="form__row register-form__row--accept-terms">
					<input className="form__input form__input--checkbox" type="checkbox" name="terms" id="terms"/>
					<label className="form__label form__label--checkbox"
					       htmlFor="terms">I agree to the Terms and Conditions</label>
				</div>

				<div className="form__row register-form__row--submit">
					<input className="form__button form__button--submit" type="submit" value="Register"/>
				</div>

				<div className="form__message form__message--error">{error}</div>
			</form>
		</>
	);
}
