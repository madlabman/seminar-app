import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {AsyncStorage} from 'react-native';
import {apiMiddleware} from 'redux-api-middleware';

import {
    uiReducer,
    citiesReducer,
    subjectsReducer,
    userReducer,
    debugReducer
} from './reducers';

const rootReducer = combineReducers({
    debug: debugReducer,
    ui: uiReducer,
    user: userReducer,
    cities: citiesReducer,
    subjects: subjectsReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['ui', 'user']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default () => {
    let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(apiMiddleware)));
    let persistor = persistStore(store);
    return {store, persistor}
}