import { Helmet } from 'react-helmet';

export default () => (
	<>
		<Helmet>
			<title>Login</title>
			<meta name="description"
			      content="Secure user login page for Whisper. Enter your username and password to access your account and manage your profile settings."/>
		</Helmet>

		<form className="form login-form" onSubmit={e => e.preventDefault()}>
			<div className="form__message form__message--error">Error message goes here</div>
			<label className="form__label" htmlFor="username">Username</label>
			<input className="form__input form__input--username" type="text" name="username" placeholder="Username" />
			<label className="form__label" htmlFor="password">Password</label>
			<input className="form__input form__input--password" type="password" name="password" placeholder="Password" />

			<button className="form__button form__button--submit" type="submit">Login</button>
			<input className="form__input form__input--checkbox" type="checkbox" name="checkbox" id="checkbox" />
			<label className="form__label" htmlFor="checkbox">Stay logged in</label>
		</form>
	</>
);
