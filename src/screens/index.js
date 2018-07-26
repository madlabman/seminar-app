import {Navigation} from 'react-native-navigation';

import SplashScreen from './SplashScreen';
import SignUpScreen from './SignUpScreen';
import MainScreen from './MainScreen';

export function registerScreens() {
    Navigation.registerComponent('seminar.SplashScreen', () => SplashScreen);
    Navigation.registerComponent('seminar.SignUpScreen', () => SignUpScreen);
    Navigation.registerComponent('seminar.MainScreen', () => MainScreen);
}