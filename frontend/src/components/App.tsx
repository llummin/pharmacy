import React from 'react';
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import PhoneAuthPage from '../pages/PhoneAuthPage';
import CartPage from '../pages/CartPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PhoneAuthPage/>}/>
				<Route path="/cart" element={<CartPage/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
