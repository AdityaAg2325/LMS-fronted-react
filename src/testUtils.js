import React from 'react';
import { render, waitFor,screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';


const AllTheProviders = ({ children }) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                { children }
            </Provider>
        </BrowserRouter>
    )
}

const customRender = (ui, options) => 
    render(ui, {wrapper: AllTheProviders, ...options})


export * from '@testing-library/react';
export { customRender as render };

export const dispatchToast = (store, message, type, duration = 5000) => {
    store.dispatch(addToast(message, type, duration));
};