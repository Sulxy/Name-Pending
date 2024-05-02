import { NavLink } from 'react-router-dom';

export default function PageFooter() {
	return (
		<footer className="page-footer">
			<nav className="page-footer__nav">
				<ul className="page-footer__list">
					<li className="page-footer__item">
						<NavLink to="/privacy-policy" className="link page-footer__link">
							Privacy Policy
						</NavLink>
					</li>
					<li className="page-footer__item">
						<NavLink to="/terms-of-service" className="link page-footer__link">
							Terms of Service
						</NavLink>
					</li>
				</ul>
			</nav>
			<p className="page-footer__text">
				Designed and coded by #Ctrl-Alt-Defeat (Danny Sanchez, Joshua Hale, Ray Beliveau, Samuel Bishop).
			</p>
		</footer>
	);
};
