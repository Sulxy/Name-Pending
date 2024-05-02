import { Helmet } from 'react-helmet';

export default () => (
	<>
		<Helmet>
			<title>Register</title>
			<meta name="description" content="Create a new account on our site. Enter your personal information and secure your profile."/>
		</Helmet>

		<form className="form register-form" onSubmit={e => e.preventDefault()}>
			<div className="form__message form__message--error">Error message goes here</div>

			<label className="form__label" htmlFor="name">Name</label>
			<input className="form__input form__input--name" type="text" name="name" placeholder="Full Name"/>

			<label className="form__label" htmlFor="username">Name</label>
			<input className="form__input form__input--username" type="text" name="username" placeholder="Username"/>

			<label className="form__label" htmlFor="email">Email</label>
			<input className="form__input form__input--email" type="email" name="email" placeholder="Email"/>

			<label className="form__label" htmlFor="password">Password</label>
			<input className="form__input form__input--password" type="password" name="password"
			       placeholder="Password"/>

			<label className="form__label" htmlFor="confirmpassword">Confirm Password</label>
			<input className="form__input form__input--confirm-password" type="password" name="confirmpassword"
			       placeholder="Confirm Password"/>

			<input className="form__input form__input--checkbox" type="checkbox" name="coppa" id="coppa"/>
			<label className="form__label form__label--checkbox" htmlFor="coppa">I agree that I am at least 13 years
				old</label>

			<input className="form__input form__input--checkbox" type="checkbox" name="terms" id="terms"/>
			<label className="form__label form__label--checkbox" htmlFor="terms">I agree to the Terms and
				Conditions</label>

			<input className="form__button form__button--submit" type="submit" value="Register"/>
		</form>
	</>
);
