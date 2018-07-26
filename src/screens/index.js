import {Navigation} from 'react-native-navigation';

import SplashScreen from './SplashScreen';
import SignUpScreen from './SignUpScreen';
import MainScreen from './MainScreen';
import SinglePostScreen from './SinglePostScreen';
import PostsScreen from './PostsScreen';

export function registerScreens() {
    Navigation.registerComponent('seminar.SplashScreen', () => SplashScreen);
    Navigation.registerComponent('seminar.SignUpScreen', () => SignUpScreen);
    Navigation.registerComponent('seminar.MainScreen', () => MainScreen);
    Navigation.registerComponent('seminar.SinglePostScreen', () => SinglePostScreen);
    Navigation.registerComponent('seminar.PostsScreen', () => PostsScreen);
}