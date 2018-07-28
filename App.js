import startFromSignUp from './src/screens/helpers/openSignUp';
import startFromSplashScreen from './src/screens/helpers/openSplashScreen';
import {registerScreens} from './src/screens';

export default class App {
    constructor() {
        registerScreens();
        // Start app
        startFromSplashScreen();
    }
}