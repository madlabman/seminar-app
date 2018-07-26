import React, {Component} from 'react';
import {Text} from 'react-native-elements';

export default class SplashScreen extends Component {
    render() {
        return (
            <Text>Пока приложение загружает данные из хранилища, данный экран будет открыт</Text>
        )
    }
}