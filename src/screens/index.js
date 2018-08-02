import {Navigation} from 'react-native-navigation';

import SplashScreen from './SplashScreen/SplashScreen';
import SignUpScreen from './SignUpScreen/SignUpScreen';
import MainScreen from './MainScreen/MainScreen';
import SinglePostScreen from './SinglePostScreen/SinglePostScreen';
import PostsScreen from './PostsScreen/PostsScreen';
import MenuScreen from './MenuScreen/MenuScreen';
import UserDefinitionsScreen from './UserDefinitionsScreen/UserDefinitionsScreen';

export function registerScreens(store, provider) {
    Navigation.registerComponent('seminar.SplashScreen', () => SplashScreen);
    Navigation.registerComponent('seminar.SignUpScreen', () => SignUpScreen, store, provider);
    Navigation.registerComponent('seminar.MainScreen', () => MainScreen, store, provider);
    Navigation.registerComponent('seminar.SinglePostScreen', () => SinglePostScreen, store, provider);
    Navigation.registerComponent('seminar.PostsScreen', () => PostsScreen);
    Navigation.registerComponent('seminar.MenuScreen', () => MenuScreen, store, provider);
    Navigation.registerComponent('seminar.UserDefinitionsScreen', () => UserDefinitionsScreen, store, provider);
}