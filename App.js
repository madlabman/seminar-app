import {Provider} from 'react-redux';

import openSplashScreen from './src/screens/helpers/openSplashScreen';
import {registerScreens} from './src/screens';
import configureStore from './src/store/store';

export default class App {
    constructor() {
        // Start app
        const {store, persistor} = configureStore();
        registerScreens(store, Provider);
        openSplashScreen(store, persistor);
    }
}