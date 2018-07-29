import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import AppLoading from '../../components/AppLoading';
import SplashScreenRedirect from '../../components/SplashScreenRedirect';

export default class SplashScreen extends Component {
    render() {
        return (
            <PersistGate loading={<AppLoading/>} persistor={this.props.persistor}>
                <Provider store={this.props.store}>
                    <SplashScreenRedirect />
                </Provider>
            </PersistGate>
        )
    }
}