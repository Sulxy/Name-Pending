import { Helmet } from 'react-helmet';
import { Menu } from '.';

export default function Header() {
	return (
		<header className="page-header">
			<h1 className="page-header__item page-header__title">Whisper</h1>
			<Menu/>
			<div className="page-header__item"></div>
		</header>
	);
}
