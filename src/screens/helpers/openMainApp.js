import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

export default openMainApp = () => {
    Icon.getImageSource('bars', 30)
        .then(icon => {
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'seminar.MainScreen',
                    title: 'Главная',
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