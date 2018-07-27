import {Navigation} from 'react-native-navigation';

import SplashScreen from './SplashScreen/SplashScreen';
import SignUpScreen from './SignUpScreen/SignUpScreen';
import MainScreen from './MainScreen/MainScreen';
import SinglePostScreen from './SinglePostScreen/SinglePostScreen';
import PostsScreen from './PostsScreen/PostsScreen';
import MenuScreen from './MenuScreen/MenuScreen';

export function registerScreens() {
    Navigation.registerComponent('seminar.SplashScreen', () => SplashScreen);
    Navigation.registerComponent('seminar.SignUpScreen', () => SignUpScreen);
    Navigation.registerComponent('seminar.MainScreen', () => MainScreen);
    Navigation.registerComponent('seminar.SinglePostScreen', () => SinglePostScreen);
    Navigation.registerComponent('seminar.PostsScreen', () => PostsScreen);
    Navigation.registerComponent('seminar.MenuScreen', () => MenuScreen);
}