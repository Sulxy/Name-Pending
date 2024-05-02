import { Helmet } from 'react-helmet';
// Load CSS
import '../assets/styles/login.scss';

export default () => (
	<main className="content login">
		<Helmet>
			<title>Login</title>
			<meta name="description" content="This is the login page, for a user to login"/>
		</Helmet>
	</main>
);
