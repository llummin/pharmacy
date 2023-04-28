import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import Store from "./store/Store";
import "../src/assets/input.css"
import CategoryList from "./components/CategoryList";

interface State {
    store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
    store,
})

ReactDOM.render(
    <Context.Provider value={{store}}>
        <CategoryList/>
    </Context.Provider>,
    document.getElementById('root')
);