import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import logo from '../../../assets/img/logo-seminar.png';

export default class TopBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} resizeMethod="resize" style={styles.logo}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 146,
        height: 24,
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
    }
});