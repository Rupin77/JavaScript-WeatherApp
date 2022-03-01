import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './SearchCard';
import Main from './Main';

function App() {
	return (
		<div className="App">	
			<BrowserRouter>
				<Routes>					
					<Route path="/search" element={<Search />} />
					<Route path="/" element={<Main />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
