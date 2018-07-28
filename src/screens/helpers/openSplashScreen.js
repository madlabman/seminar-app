import {Navigation} from 'react-native-navigation';

export default function openSplashScreen() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'seminar.SplashScreen',
            title: 'Семинар-ПРО',
        }
    });
}