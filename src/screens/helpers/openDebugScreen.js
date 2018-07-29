import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import DebugScreen from '../DebugScreen/DebugScreen';
import configureStore from '../../store/store';

export default openDebug = () => {
    if (!__DEV__) return;

    const store = configureStore();
    Navigation.registerComponent('seminar.DebugScreen', () => DebugScreen, store, Provider);
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'seminar.DebugScreen',
            title: 'Отладка',
        }
    });
}