import startFromSignUp from './src/screens/helpers/startFromSignUp';
import startFromSplashScreen from './src/screens/helpers/startFromSplashScreen';
import {registerScreens} from './src/screens';

export default class App {
    constructor() {
        registerScreens();
        // Start app
        startFromSplashScreen();
    }
}