import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
// Import Components
import { Footer, Header } from './components';
import { Dashboard, Login } from './pages';

// Load CSS
import './assets/styles/main.scss';

function App() {
	const [count, setCount] = useState(0);

	return (
		<Router>
			<Helmet defaultTitle="Home"
			        titleTemplate="%s | Ray Beliveau"/>
			<Header/>

			<Routes>
				{/* <!-- ADD BODY STUFF --> */}
			</Routes>

			<Footer/>
		</Router>
	);
}

export default App;
