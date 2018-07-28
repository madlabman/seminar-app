import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import {apiMiddleware} from 'redux-api-middleware';

import uiReducer from './reducers/ui';
import citiesReducer from './reducers/cities';

const rootReducer = combineReducers({
    ui: uiReducer,
    cities: citiesReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['ui']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(apiMiddleware)));
    let persistenceUnit = persistStore(store);
    return store;
};

export default configureStore;