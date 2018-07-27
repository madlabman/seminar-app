import {Navigation} from 'react-native-navigation';

export default function startFromSplashScreen() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'seminar.SplashScreen',
            title: 'Семинар-ПРО',
        }
    });
}