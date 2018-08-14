import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const navigatorStyle = {
    navBarTitleTextCentered: true,
    navBarButtonColor: '#000',
    navBarCustomView: 'seminar.TopBar'
};

export default openSignUp = () => {
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
            ]
        })
    });
}