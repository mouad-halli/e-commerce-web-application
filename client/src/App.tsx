import { Outlet } from "react-router-dom";
import './App.scss'
import Navbar from "./components/ui/Navbar/Navbar";
import Footer from "./components/ui/Footer/Footer";

const App = () => {

	return (
		<div className="app-container">
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	)
}

export default App
