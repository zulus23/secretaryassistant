/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga'


import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.carmine.compact.css';


import './index.css';
import App from './App';
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./rootReducer";
import rootSaga from "./redux/modules/rootSaga";


import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer,composeEnhancers(createStoreWithMiddleware));

sagaMiddleware.run(rootSaga);





ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>

</Provider> , document.getElementById('root'));


serviceWorker.unregister();
