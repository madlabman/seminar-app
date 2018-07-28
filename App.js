import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';

import startFromSignUp from './src/screens/helpers/openSignUp';
import openSplashScreen from './src/screens/helpers/openSplashScreen';
import {registerScreens} from './src/screens';
import configureStore from './src/store/store';

export default class App {
    constructor() {
        const store = configureStore();
        registerScreens(store, Provider);
        // Start app
        openSplashScreen();
    }
}