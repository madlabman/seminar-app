import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import {MAIN_COLOR} from '../../../config';

const navigatorStyle = {
    navBarTitleTextCentered: true,
    navBarButtonColor: '#000',
    navBarCustomView: 'seminar.TopBar'
};

const openSignUp = () => {
    return Promise.all([
        Icon.getImageSource('user-plus', 24),
        Icon.getImageSource('sign-in', 24)
    ]).then(icons => {
        return Navigation.startTabBasedApp({
            tabs: [
                {
                    label: 'Регистрация',
                    icon: icons[0],
                    screen: 'seminar.SignUpScreen',
                    title: 'Регистрация',
                    navigatorStyle
                },
                {
                    label: 'Вход',
                    icon: icons[1],
                    screen: 'seminar.SignInScreen',
                    title: 'Вход',
                    navigatorStyle
                }
            ],
            tabsStyle: {
                tabBarHidden: false, // make the tab bar hidden
                tabBarButtonColor: '#000', // change the color of the tab icons and text (also unselected)
                tabBarSelectedButtonColor: MAIN_COLOR, // change the color of the selected tab icon and text (only selected)
                tabBarLabelColor: '#000', // iOS only. change the color of tab text
                tabBarSelectedLabelColor: MAIN_COLOR, // iOS only. change the color of the selected tab text
            },
            appStyle: {
                tabBarButtonColor: '#000',
                tabBarSelectedButtonColor: MAIN_COLOR,
                keepStyleAcrossPush: false,
                forceTitlesDisplay: true
            },
        })
    });
};

export default openSignUp;