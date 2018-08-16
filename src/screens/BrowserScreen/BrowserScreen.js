import React, {Component} from 'react';
import {StyleSheet, View, WebView} from 'react-native';
import PropTypes from 'prop-types';

export default class BrowserScreen extends Component {
    static propTypes = {
        uri: PropTypes.string.isRequired
    };

    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Закрыть', // for a textual button, provide the button title (label)
                id: 'close_modal',
                buttonColor: '#000'
            }
        ]
    };

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress'
            && event.id === 'close_modal') {
            this.props.navigator.dismissModal();
        }
    };

    componentDidMount() {
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{uri: this.props.uri}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});