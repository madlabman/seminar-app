import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, WebView} from 'react-native';
import {CachedImage} from 'react-native-cached-image';
import {Icon, Text} from 'react-native-elements';

export default class SinglePostScreen extends Component {

    render() {

        let voteButtons = null;
        if (this.props.type === 'announce') {
            voteButtons = (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <Icon name={'thumb-up'} color={'#fff'}
                              containerStyle={[styles.button, {backgroundColor: 'green'}]}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name={'thumb-down'} color={'#fff'}
                              containerStyle={[styles.button, {backgroundColor: 'red'}]}/>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text h4 style={styles.title}>{this.props.item.title}</Text>
                {voteButtons}
                <WebView source={this.props.item.permalink} style={styles.browser}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        textAlign: 'center'
    },
    container: {
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        margin: 10,
        width: 40,
        height: 40,
        backgroundColor: '#000',
        borderRadius: 20
    },
    browser: {
        marginTop: 10
    }
});