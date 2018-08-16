import React, {Component} from 'react';
import {Text} from 'react-native-elements';
import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from 'react-native';

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
                <View style={iconStyles}>
                    <Text
                        style={{
                            color: this.props.active ? this.props.activeColor : this.props.color
                        }}
                    >
                        {this.props.text}
                    </Text>
                </View>
            );

        return (
            <TouchableOpacity onPress={this.props.onPress}>{icon}</TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        borderRadius: 25,
    }
});