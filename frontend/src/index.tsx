import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import Store from "./store/Store";
import "../src/assets/input.css"
import CategoryFilter from "./components/CategoryFilter";

interface State {
    store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
    store,
})

ReactDOM.render(
    <Context.Provider value={{store}}>
        <CategoryFilter/>
    </Context.Provider>,
    document.getElementById('root')
);