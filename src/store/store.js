import {createStore, combineReducers, compose, applyMiddleware} from 'redux';

import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
    ui: uiReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers());
};

export default configureStore;