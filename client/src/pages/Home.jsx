// User.jsx
import React from 'react';
import { UserLogin } from '../components';

// Load CSS
import '../assets/styles/home.scss';

export default () => {
	return (
		<main className='content home'>
			<UserLogin/>
			<section className='test test1'>
				Test
			</section>
			<section className='test test2'>
				Test
			</section>
			<section className='test test3'>
				Test
			</section>
		</main>
	);
}
