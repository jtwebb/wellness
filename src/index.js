import React from 'react';
import { render } from 'react-dom';
import configureStore from './redux/configureStore';
import './styles/app.scss';
import App from './components/app/app';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

const store = configureStore();

const renderApp = () => {
    render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    );
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./components/app/app', renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
