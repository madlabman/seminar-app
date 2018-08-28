import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

export default openMainApp = (options = {}) => {
    const defaults = {
        forceUpdate: false
    };
    // Merge options
    console.log('before merge', options);
    options = {
        ...defaults,
        ...options
    }

    console.log('after merge', options);

    Promise.all([
        Icon.getImageSource('bars', 24),
        Icon.getImageSource('user-circle', 24)
    ])
        .then(icons => {
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'seminar.MainScreen',
                    title: 'Главная',
                    navigatorButtons: {
                        leftButtons: [
                            {
                                buttonColor: '#000',
                                id: 'menu-toggle',
                                icon: icons[0],
                            }
                        ],
                        rightButtons: [
                            {
                                buttonColor: '#000',
                                id: 'account',
                                icon: icons[1],
                            }
                        ]
                    },
                },
                passProps: {
                    forceUpdate: options.forceUpdate
                },
                drawer: {
                    left: {
                        screen: 'seminar.MenuScreen'
                    }
                }
            })
        })
}