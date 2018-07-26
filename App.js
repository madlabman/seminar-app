import {Navigation} from 'react-native-navigation';

import {registerScreens} from './src/screens';

export default class App {
    constructor() {
        registerScreens();
        // Start app
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'seminar.MainScreen',
                title: 'Семинар-ПРО',
                navigatorButtons: {
                    leftButtons: [
                        {
                            title: 'Меню',
                            id: 'menu-toggle'
                        }
                    ]
                }
            },
            drawer: {
                left: {
                    screen: 'seminar.MenuScreen'
                }
            }
        })
    }
}