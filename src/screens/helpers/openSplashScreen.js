import {Navigation} from 'react-native-navigation';

export default openSplashScreen = (store, persistor) => {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'seminar.SplashScreen',
            title: 'Семинар-ПРО',
        },
        passProps: {
            store,
            persistor,
        }
    });
}