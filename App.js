import {Provider} from 'react-redux';

import startFromSignUp from './src/screens/helpers/openSignUp';
import startFromSplashScreen from './src/screens/helpers/openSplashScreen';
import {registerScreens} from './src/screens';
import configureStore from './src/store/store';

export default class App {
    constructor() {
        const store = configureStore();
        registerScreens(store, Provider);
        // Start app
        startFromSplashScreen();
    }
}