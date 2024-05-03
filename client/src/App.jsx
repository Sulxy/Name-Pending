import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
// Import Components
import { PageFooter, PageHeader } from './components';
import { Home, User, Whispers } from './pages';

// Load CSS
import './assets/styles/main.scss';

function App() {
	const [count, setCount] = useState(0);

	return (
		<Router>
			<Helmet defaultTitle="Home"
			        titleTemplate="%s | Whisper"/>
			<PageHeader/>

			<Routes>
				<Route path="/" component={Home}/>
				<Route path="/user/*" element={<User/>}/>
				<Route path="/whisper/*" element={<Whispers/>}/>
			</Routes>

			<PageFooter/>
		</Router>
	);
}

export default App;
