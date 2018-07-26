import {Navigation} from 'react-native-navigation';

import {registerScreens} from './src/screens';

export default class App {
    constructor() {
        registerScreens();
        // Start app
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'seminar.SplashScreen',
                title: 'Семинар-ПРО'
            }
        })
    }
}