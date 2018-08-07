import React, {Component} from 'react';
import {WebView} from 'react-native';
import PropTypes from 'prop-types';

export default class BrowserScreen extends Component {
    static propTypes = {
        uri: PropTypes.string.isRequired
    };

    render() {
        return (
            <WebView
                source={{uri: this.props.uri}}
            />
        )
    }
}