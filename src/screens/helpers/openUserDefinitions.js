import {Navigation} from 'react-native-navigation';

export default function openUserDefinitions() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'seminar.UserDefinitionsScreen',
            title: 'Семинар-ПРО',
        }
    });
}