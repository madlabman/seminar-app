import React, {Component} from 'react';
import {Icon} from 'react-native-elements';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';

export default class TouchableIcon extends Component {
    render() {

        let iconStyles = this.props.active ?
            [styles.button, this.props.activeStyle] : styles.button;

        let icon = this.props.isLoading ?
            (
                <ActivityIndicator
                    style={iconStyles}
                    color={this.props.active ? this.props.activeColor : this.props.color}
                />
            ) :
            (
                <Icon
                    {...this.props}
                    color={this.props.active ? this.props.activeColor : this.props.color}
                    containerStyle={iconStyles}
                />
            );

        return (
            <TouchableOpacity>{icon}</TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        borderRadius: 25
    },
});