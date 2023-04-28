import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import Store from "./store/Store";
import "../src/assets/input.css"
import ShoppingCart from "./components/ShoppingCart";
import Navbar from "./components/Navbar";

interface State {
    store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
    store,
})

ReactDOM.render(
    <Context.Provider value={{store}}>
        <Navbar/>
    </Context.Provider>,
    document.getElementById('root')
);