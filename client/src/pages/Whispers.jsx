// User.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

// Load CSS
import '../assets/styles/whispers.scss';

export default () => {
	return (
		<main className="content whispers">
			<Helmet>
				<title>Whispers</title>
				<meta name="description" content="This is a place to have a dicussion."/>
			</Helmet>

		</main>
	);
}
