import React from 'react';
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhoneAuthPage from '../pages/PhoneAuthPage';
import CartPage from '../pages/CartPage';
import Home from '../pages/Home';

function App() {
	return (
		<BrowserRouter>
			<Navbar/>
			<Routes>
				<Route path="/login" element={<PhoneAuthPage/>}/>
				<Route path="/cart" element={<CartPage/>}/>
				<Route path="/" element={<Home/>}/>
			</Routes>
			<Footer/>
		</BrowserRouter>
	);
}

export default App;