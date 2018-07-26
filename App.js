import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import {registerScreens} from './src/screens';

export default class App {
    constructor() {
        registerScreens();
        // Start app
        Icon.getImageSource('bars', 30)
            .then(icon => {
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'seminar.MainScreen',
                        title: 'Семинар-ПРО',
                        navigatorButtons: {
                            leftButtons: [
                                {
                                    buttonColor: '#000',
                                    id: 'menu-toggle',
                                    icon,
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
            });

    }
}