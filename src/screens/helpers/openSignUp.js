import {Navigation} from 'react-native-navigation';

export default function openSignUp() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'seminar.SignUpScreen',
            title: 'Семинар-ПРО',
        }
    });
}