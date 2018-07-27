import {Navigation} from 'react-native-navigation';

export default function startFromSignUp() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'seminar.SignUpScreen',
            title: 'Семинар-ПРО',
        }
    });
}