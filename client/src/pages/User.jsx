// User.jsx
import React from 'react';
import { UserLogin, UserRegister } from '../components';

// Load CSS
import '../assets/styles/user.scss';

export default () => {
	return (
		<main className="content user">
			<Login/>
			<Register/>
		</main>
	);
}
