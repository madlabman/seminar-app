import {Navigation} from 'react-native-navigation';

import SplashScreen from './SplashScreen';

export function registerScreens() {
    Navigation.registerComponent('seminar.SplashScreen', () => SplashScreen);
}