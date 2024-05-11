import { Helmet } from 'react-helmet';
import { PageMenu, LanguageSwitcher, ThemeSwitcher } from '.';

export default function PageHeader() {
	return (
		<header className="page-header">
			<h1 className="page-header__item page-header__title">Whisper</h1>
			<PageMenu/>
			<LanguageSwitcher/>
			<ThemeSwitcher/>
			<div className="page-header__item"></div>
		</header>
	);
}
