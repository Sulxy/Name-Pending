import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Footer, Header } from './components';

// Load CSS
import './assets/styles/main.scss';
import { Helmet } from 'react-helmet';

function App() {
	const [count, setCount] = useState(0);

	return (
		<Router>
			<Helmet defaultTitle="Home"
			        titleTemplate="%s | Ray Beliveau"/>
			<Header/>

			<Routes>
				<!-- ADD BODY STUFF -->
			</Routes>

			<Footer/>
		</Router>
	);
}

export default App;
