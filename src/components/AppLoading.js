import React, {Component} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';

import logo from '../../assets/img/logo-seminar.png';

export default class AppLoading extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logo}/>
                <ActivityIndicator size='small' color='#545454' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 146,
        height: 24,
        marginBottom: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});