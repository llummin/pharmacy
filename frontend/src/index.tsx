import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from "./store/Store";
import "../src/assets/input.css"
import ProductList from "./components/ProductList";

interface State {
    store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
    store,
})

ReactDOM.render(
    <Context.Provider value={{store}}>
        <ProductList/>
    </Context.Provider>,
    document.getElementById('root')
);