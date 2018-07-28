import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import {apiMiddleware} from 'redux-api-middleware';

import uiReducer from './reducers/ui';
import citiesReducer from './reducers/cities';

const rootReducer = combineReducers({
    ui: uiReducer,
    cities: citiesReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    let store = createStore(rootReducer, composeEnhancers(applyMiddleware(apiMiddleware), autoRehydrate()));
    persistStore(store, {
        storage: AsyncStorage
    });
    return store;
};

export default configureStore;